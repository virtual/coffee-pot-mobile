var express = require('express');
var app = require("express")();
var server = require('http').Server(app);
var io = require('socket.io');
let bodyParser = require("body-parser");
var fetch = require('node-fetch');
var expressSession = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var passwordHash = require("password-hash");
var cookieParser = require('cookie-parser');
var http = require('http');
var path  = require('path');
const { Pool } = require('pg');
const AWS = require('aws-sdk');
// var fs = require('fs');

require('dotenv').config();



const pool = new Pool({
  user: process.env.ELEPHANT_DB_USER,
  host: 'baasu.db.elephantsql.com',
  database: process.env.ELEPHANT_DB_USER,
  password: process.env.ELEPHANT_DB_PASSWORD,
  port: 5432
});


 
var allowedOrigins = "http://localhost:* http://192.168.*.*:* https://coffee-pot-pi.herokuapp.com:*";
var ioServer = io(server, {
  origins: allowedOrigins
});
 
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({ secret: "moby" }));
app.use(passport.initialize());
app.use(passport.session());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
} else {
  app.use(express.static('public'));
}

// needs to be called username 
passport.use(new LocalStrategy({email: 'username', password: 'password'},
function(email, password, done){
  // hit the db and do some matching
  let query = 'SELECT * from users where email = \'' + email + '\'';
  pool.query(query, function(err, user, fields) {
    if (err) {
      return done(err, null); // null for no user
    } else {
      if (user.rows[0] && passwordHash.verify(password, user.rows[0].password)){
        return done(null, user.rows[0]);
      } else {
        // additional test and error handling here
        return done("Password and username don't match", null)
      }
    }
  });
  }
)); 

passport.serializeUser(function (user, done) {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  let query = `SELECT * from users where id = ${id}`;
  pool.query(query, (err, user) => {
    if (err) throw err;
    else {
      done(null, user);
    }
  })
  })

  ioServer.on('connection', (client) => {
    console.log('client connected')

    function getCurrentCoffee() {
      let query = `SELECT users.firstname, users.image, history.cupcount, users.id, history.status FROM users INNER JOIN history ON users.id = history.userid WHERE history.status = 0`;
      pool.query(query, (err, rows) => {
        data = rows.rows;
        ioServer.in(rows).emit('postedCup', data);
      })
    }

    client.on('coffeeConnect', (coffee) => {
      client.join(coffee);
    });

    client.on('/postcup', (data) => {
      let checkUserCt = `SELECT * FROM history WHERE userid = ${data.userid} AND status = 0`;
      pool.query(checkUserCt, (err, rows)=>{
        // if user in current brew state
        if (rows.rowCount > 0) {
          let updateQuery = `UPDATE history SET cupcount = ${data.cupcount} where userid = ${data.userid} RETURNING cupcount`
          pool.query(updateQuery, (err,rows) => { 
            getCurrentCoffee();
          })
        } else { // user not in current brew state yet
          let insertQuery = `INSERT INTO history (cupcount, status, userid) values (${data.cupcount}, 0, ${data.userid})`
          pool.query(insertQuery, (err, rows) => {
            if (err) throw err;
            getCurrentCoffee();
          }) 
        }
      })
    })

    client.on('/startBrew', (data) => {
      let startQuery = `UPDATE history SET status = 1 WHERE status = 0`
      pool.query(startQuery, (err, rows) => {
        getCurrentCoffee();
      })
    })

    client.on('/endBrew', (data) => {
      let startQuery = `UPDATE history SET status = 2 WHERE status = 1`;
      pool.query(startQuery, (err, rows) => {
        if (err) throw err;
          ioServer.in(rows).emit('postedCup', rows.data);
      })
    })

    client.on('disconnect', ()=>{console.log("client disconnected")});
  });

  app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      res.json({ found: false, success: false, err: true, message: err });
    } else if (user) {
      req.logIn(user, (err) => {
        if (err) {
          next(err);
          res.json({ found: true, success: false, message: err })
        } else {
          let sum = 0
          let sumQuery = `select sum(cupcount) from history where status = 0;`
          pool.query(sumQuery, (err, rows) => {
            sum = rows.rows[0].sum
            let query = `SELECT * FROM history where userid = ${user.id} and status = 0`;
            pool.query(query, (error, rows) => {
              if (error) throw error;
              if (rows.rowCount > 0) {
                userCupcount = parseInt(rows.rows[0].cupcount);
              } else {
                userCupcount = 0
              }
              let theseUsers = {
                cupcount: null
              }
              let userQuery = `SELECT * FROM users INNER JOIN history ON users.id = history.userid where history.status = 0`;
              pool.query(userQuery, (error, users) => {
                if (error) throw error;
                theseUsers = users.rows;
                res.json({ 
                  users: theseUsers,
                  found: true, 
                  success: true, 
                  id: user.id, 
                  totalCount: sum, 
                  userCupcount: userCupcount, 
                  email: user.email, 
                  firstName: user.firstname, 
                  lastName: user.lastname })
              })
            })
          })
        }
      })
    } else {
      res.json({ found: false, success: false, message: "Something went wrong!" })
    }
  })(req, res, next);
  var email = req.body.email;
  var password = req.body.password;
});

app.post('/socketUrl', (req, res)=>{
  if (process.env.PORT){
    res.json('https://coffee-pot-pi.herokuapp.com:');
  } else {
    res.json('http://localhost:5000')
  }
});




/*
 * Respond to GET requests to /sign-s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and
 * the anticipated URL of the image.
 */

app.get('/sign-s3', (req, res) => {
  //const s3 = new aws.S3();
const S3_BUCKET = process.env.S3_BUCKET;

  var s3 = new AWS.S3({
    'accessKeyId'     : process.env.ACCESS_KEY_ID,
    'secretAccessKey' : process.env.SECRET_ACCESS_KEY,
    'region'          : 'us-west-1'
  });

  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  if (fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/gif') {
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  } else {
    console.log('invalid file type')
    res.end();
  }
});

app.post('/signup', (req, res, next) => {
  // console.log(req.body)
  let query = `INSERT INTO users (firstname, lastname, email, password, image) values ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${passwordHash.generate(req.body.password)}', '${req.body.image}') RETURNING id, firstname, lastname, email, id, image`  
  pool.query(query, (err, user) => {
    // console.log(query)
    // console.log(user)
    
  if (err) throw err;
    res.json(user.rows);
  });    
});

app.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

var port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('listening on port ' + port);
});    