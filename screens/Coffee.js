import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, TextInput, View, StatusBar } from 'react-native';
import tabstyle from '../styles';
import { Avatar, COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import Container from '../Container';
import { StackNavigator } from 'react-navigation';
import SocketIOClient from 'socket.io-client';
import Chipper from './Chipper';
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
      this.socket.emit('/endBrew');
      this.setState({
        clock: false
      })
    }

    addCup(){
      let thisCount = this.props.screenProps.store.user.userCupcount;
      console.log(thisCount)
      console.log('thisCount')
      if (thisCount <= 11) {
        console.log('blerrrstterrrrff')
      thisCount = thisCount + 1;
      this.socket.emit('/postcup', {
        cupcount: thisCount,
        userid: this.props.screenProps.store.user.id
        })
      } else {
        alert('Coffee pot at capacity!')
      }
    } 

    componentDidMount(){
      axios.post('http://localhost:5000/socketUrl').then((res) => {
        var socketUrl = res.data;
        this.socket = SocketIOClient(socketUrl)
        this.socket.emit('coffeeConnect', res)
        this.socket.on('postedCup', (data) => {
          console.log('fuck fuck fuck fuck fuk')
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
            console.log(totalCupcount)
            console.log('shit fuck damn')
            console.log(this.props.screenProps.store.user.totalCount)
            console.log('what a lovely string')
            let storeCount = this.props.screenProps.store.user.totalCount;
            console.log(storeCount)
            if (storeCount == null) {
              storeCount = 0;
              console.log('iffer')
              console.log(storeCount)
            } else if (storeCount <= 12) {
            storeCount = totalCupcount;
            console.log('else iffer')
            console.log(storeCount)
            } else {
              storeCount = 12;
              alert('Coffee pot at capacity!');
              console.log('elser')
              console.log(storeCount)
            }
      //      this.props.screenProps.store.user = data;
          } else {
            this.props.screenProps.store.user = [];
          }
          })
      })
    }

    render() {
      if (this.props.screenProps.store.user && this.state.clock == false) {
      return (
        <View style={styles.contentContainer}>
            <Image source={require('../images/main-background.jpg')} style={styles.jumbotron}>
              <View style={{ flex: 1 }}>
                <View style={styles.footer}>
                  <View style={styles.buttonTop} >
                    <Button raised primary
                      onPress={this.addCup}
                      title="Add Cup"
                      text="Add Cup"
                    />
                  </View>
                  <Chipper info={this.props.screenProps.store.user}/>
                  <View style={styles.buttonBottom} >
                    <Button raised secondary
                      onPress={this.startBrew}
                      title="Start Brew"
                      text="Start Brew"
                    />
                  </View>
                </View>
              </View>
            </Image>
        </View>
      )} else if (this.props.screenProps.store.user && this.state.clock == true) {
        return (
          <View>
            <Text>Calls LOADING</Text>
            <View className='sr-only'>
            <Text> Calls COUNTDOWN</Text>
           </View>
          </View>
        )}
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
      },
      buttonBottom: {
        paddingBottom: 16
      },
      buttonTop: {
        paddingTop: 16,
        paddingBottom: 320
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