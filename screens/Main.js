import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { COLOR, ThemeProvider, Button, Toolbar } from 'react-native-material-ui';
import { StackNavigator } from 'react-navigation';
import Container from '../Container';
import Loading from './Loading';
var axios = require('axios');

export default class Main extends Component {
  static navigationOptions = {
    title: "Coffee Pot Pi",
    tabBarLabel: 'Login',
    headerStyle: {
        backgroundColor: COLOR.teal800,
    },
    headerTintColor: '#fff',
    
    tabBarIcon: ({ tintColor }) => (
      <Image
      source={require('../images/notification-icon.png')}
      style={[tabstyle.icon, { tintColor: tintColor }]}
    />
  )
}

constructor(){
  super()
    this.addCup = this.addCup.bind(this)
    this.startBrew = this.startBrew.bind(this)
    this.endBrew = this.endBrew.bind(this)
    this.socket;
    this.state = {
      clock: false
    }
  }

  startBrew(){
    this.socket.emit('/startBrew')
    this.props.user.userCupcount = 0;
    this.setState({
      clock: true
    })
  }

  endBrew(){
    // console.log('ending brew')
    this.socket.emit('/endBrew');
    this.setState({
      clock: false
    })
  }

  addCup(){
    if (this.props.user.userCupcount <= 11) {
    this.props.user.userCupcount = this.props.user.userCupcount + 1;
    this.socket.emit('/postcup', {
      cupcount: this.props.user.userCupcount,
      userid: this.props.user.id
      })
    } else {
      alert('Coffee pot at capacity!')
    }
  } 

  componentDidMount(){
    axios.post('http://192.168.1.106:5000/socketUrl').then((res) => {
      var socketUrl = res.data;
      this.socket = openSocket(socketUrl)
      this.socket.emit('coffeeConnect', res)
      this.socket.on('postedCup', (data) => {
        let sample = data;
        if (sample) {
          Array.prototype.sum = function (prop) {
            let total = 0;
            for (let i = 0, _len = this.length; i < _len; i++) {
              total +=this[i][prop]
            }
            return total
          }

          let totalCupcount = sample.sum(`cupcount`);
          if (this.props.user.totalCount <= 12) {
          this.props.user.totalCount = totalCupcount;
          } else {
            this.props.user.totalCount = 12;
            alert('Coffee pot at capacity!');
          }
          this.props.user.users = data;
        } else {
          this.props.user.users = [];
        }
        })
    })
  }

  render() {
    const currentDate = new Date();
    console.log("Main") 
    console.log(this.props); 
    const { navigate } = this.props.navigation;    
    
    const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    if (this.props.user && this.state.clock == false) {
      // console.log('wahoo')
    return (
      <View>
        <Button onClick={this.addCup}>Add a cup!
        </Button>
        <Text>All People who want coffee: calls USERS</Text>
        
        <Button onClick={this.startBrew}>Start Brew</Button>
      </View>
    )} else if (this.props.user && this.state.clock == true) {
      return (
        <View style={styles.contentContainer}>
            <Image source={require('../images/main-background.jpg')} style={styles.jumbotron}>
          <Loading />
          </Image>
        </View>
      )} else {
      return(
          <View style={styles.contentContainer}>

            <Image source={require('../images/main-background.jpg')} style={styles.jumbotron}>
              <View style={{ flex: 1 }}>
                <View style={styles.logo}>
                  <Image style={styles.logoImg} source={require('../images/logo-inverted.png')} resizeMode="contain" />
                </View>
                <View style={styles.footer}>
                  <View style={styles.buttonBottom} >
                    <Button raised primary
                      onPress={() => navigate('Signup')}
                      title="Signup"
                      text="Signup"
                    />
                  </View>
                  <View style={styles.buttonBottom} >

                    <Button raised secondary
                      onPress={() => navigate('Login')}
                      title="Login"
                      text="Login"
                    />
                  </View>
                  <View>
                  <Text style={styles.debug}>
                  STORE VAL: {this.props.screenProps.store.user[0].firstName} / / 

                  Debug with json.stringify  :D
                  </Text>
                  </View>
                </View>
              </View>
              <Text style={{ color: '#fff' }}>Solving - the problem of how much coffee to make</Text>
            </Image>



        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  debug: { backgroundColor: '#ccc', padding: 3 },
  container: {
    flex: 1,
    //backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1, // pushes the footer to the end of the screen
  },
  footer: {
    padding: 24,
    flex: 1,
  }
  ,
  buttonBottom: {
    paddingBottom: 16
  },
  jumbotron: {
    width: '100%',
    padding: 10
  },
  jumbotronText: {
    width: '100%'
  },
  jumbotronTextH1: { fontSize: 24, color: "#fff" },
  message: {
    textAlign: 'center',
    padding: 8,
    marginTop: 8,
    fontStyle: 'italic'
  },
  inputText: {
    height: 40,
    borderColor: COLOR.brown100,
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 8,
    padding: 8
  },
  logoImg: {
    flex: 1, resizeMode: "stretch", width: null, height: null
  },
  logo: {
    flexDirection: "row", flex: 1
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titles: {
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  },
  loginButton: {
    marginTop: 5
  }
});