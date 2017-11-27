import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, TextInput, View, StatusBar } from 'react-native';
import tabstyle from '../styles';
import { Avatar, COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import Container from '../Container';
import { StackNavigator } from 'react-navigation';
var axios = require('axios');

export default class Chipper extends React.Component {
  static navigationOptions = {
    title: "Chipper",
    tabBarLabel: 'Chipper',
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
  constructor() {
    super()
  }



  render() {
    console.log(this.props.info.users[0].image)
    let fuckingStupidUrl = this.props.info.users[0].image
    console.log('chipper props')
    return (
      <View style={styles.avatarContainer}>
        <Avatar image={<Image source={{uri: fuckingStupidUrl }}
        />} />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
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
  logo: {
    textAlign: 'center',
    fontSize: 20,
    padding: 16
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