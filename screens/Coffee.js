import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, TextInput, View, StatusBar } from 'react-native';
import tabstyle from '../styles';
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import Container from '../Container';
import { StackNavigator } from 'react-navigation';
var axios = require('axios');

export default class Coffee extends React.Component {
  static navigationOptions = {
    title: "Coffee",
    tabBarLabel: 'Coffee',
    headerStyle: {
        backgroundColor: COLOR.teal800   
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
      axios.post('http://192.168.1.14:5000/socketUrl').then((res) => {
        var socketUrl = res.data;
        this.socket = openSocket(socketUrl)
        this.socket.emit('coffeeConnect', res)
        this.socket.on('postedCup', (data) => {
          // console.log("postedCup+++++")
          // console.log(this.props.userStore);
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
          <View>
            <Text>Calls LOADING</Text>
            <View className='sr-only'>
            <Text> Calls COUNTDOWN</Text>
           </View>
          </View>
        )} else {
        return(
          <View>
            <View style={styles.jumbotron}>
              <View style={styles.jumbotronText}>
                <Text style={styles.jumbotronTextH1}>Coffee Pot Pi</Text>
                <Text style={{ color: '#fff'}}>Solving the problem of how much coffee to make</Text>
              </View>
            </View> 
  
              <Text>Revolutionize your coffee process</Text>
              <Text>Get your piece of the Coffee Pot "Pi"</Text>
          </View>
        )
      }
    }
  }

const styles = StyleSheet.create({
  
  jumbotron: {
    backgroundColor: "#333",
    //backgroundImage: "url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1050&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)", 
    //backgroundPosition: 'center', 
    //backgroundRepeat: 'no-repeat',
    //backgroundSize: 'cover', 
  },
  jumbotronText: {
    // background: 'linear-gradient(to right, rgba(154, 132, 120, .5), rgba(30, 19, 12, .5))',  
    position: 'absolute', 
    width: '100%'
  },
  jumbotronTextH1: {fontSize: 24},
 message: {
   textAlign: 'center',
   padding: 8,
   marginTop: 8,
   fontStyle: 'italic'
 },
  inputText:{
    height: 40,   
    borderColor: COLOR.brown100,
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 8,
    padding: 8
  },
  logo: {
    textAlign: 'center',
    fontSize: 20,
    padding: 16
  },
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titles:{
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  },
  loginButton:{
    marginTop: 5 
  }
});