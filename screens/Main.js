import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { COLOR, ThemeProvider, Button, Toolbar } from 'react-native-material-ui';
import { StackNavigator } from 'react-navigation';
import Container from '../Container';
import Loading from './Loading';
import SocketIOClient from 'socket.io-client';
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
    this.socket;
    this.state = {
      clock: false
    }
  }


  render() {
    const { navigate } = this.props.navigation;    
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
                  STORE VAL: {this.props.screenProps.store.user.firstName} / / 

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