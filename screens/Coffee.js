import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, TextInput, View, StatusBar } from 'react-native';
import tabstyle from '../styles';
import { Avatar, COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import {inject, observer} from "mobx-react/native";
import { StackNavigator } from 'react-navigation';
import SocketIOClient from 'socket.io-client';
import Chipper from './Chipper';
import Loading from './Loading';
var axios = require('axios');

@inject('store') @observer
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
        clock: false,
      }
    }


    startBrew(){
      this.socket.emit('/startBrew')
      this.props.store.user.userCupcount = 0;
    }

    endBrew(){
      this.socket.emit('/endBrew');
      this.setState({
        clock: false
      })
    }

    addCup(){
      if (this.props.store.user.userCupcount <= 11) {
      this.props.store.user.userCupcount = this.props.store.user.userCupcount + 1;
      this.socket.emit('/postcup', {
        cupcount: this.props.store.user.userCupcount,
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
          console.log(data)
          if (data.length == 0) {
            this.setState({
              clock: true
            })
          }
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
            if (this.props.store.user.totalCount <= 12) {
            this.props.store.user.totalCount = totalCupcount;
            } else {
              this.props.store.user.totalCount = 12;
              alert('Coffee pot at capacity!');
            }
            this.props.store.user.users = data            
          } else {
            this.props.store.user = [];
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
                  <Chipper/>
                  </View>
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
      )} else if (this.props.store.user && this.state.clock == true) {
        return (
          <Image source={require('../images/main-background.jpg')} style={styles.jumbotron}>
          <View style={{ flex: 1 }}>
            <Loading />
          </View>
          </Image>

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
        paddingBottom: 16,
        flex: 1,
        justifyContent: 'flex-end'
      },
      buttonTop: {
        paddingTop: 16,
        paddingBottom: 320,
        flex: 1
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