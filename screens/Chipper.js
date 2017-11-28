import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, TextInput, View, StatusBar } from 'react-native';
import tabstyle from '../styles';
import { Subheader, Divider, COLOR, ThemeProvider, Button } from 'react-native-material-ui';
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
  constructor(){
    super()
    this.arrayBlaster = this.arrayBlaster.bind(this)
  }

  arrayBlaster(data) {
    if (data) {
       return (
          <View style={styles.avatarRow}>
          <Text>{data.firstname}: </Text>
          <Text>{data.cupcount}</Text>
          </View>
        )
    } else {
      return null
    }
  }



  render() {
    console.log(this.props.info)
    console.log('skjlkjlksdf')
    let masterBlaster = this.props.info.users
    return (
      <View style={styles.avatarColumn}>
        {masterBlaster.map(this.arrayBlaster, this)}
      <View style={styles.avatarRow}>
        <Text>Total: </Text><Text>{this.props.info.totalCount}</Text>
      </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  avatarColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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