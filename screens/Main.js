import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import { StackNavigator } from 'react-navigation';

export default class Main extends Component {
  static navigationOptions = {
    title: "Welcome!",
    tabBarLabel: 'Login',
    tabBarIcon: ({ tintColor }) => (
      <Image
      source={require('../images/notification-icon.png')}
      style={[tabstyle.icon, { tintColor: tintColor }]}
 
    />
  )
}

  render() {
    const { navigate } = this.props.navigation;    
    return (
      <View>
        <Text>Main js !!</Text>
        <Button raised primary
          onPress={() => navigate('Login')}
          title="Login"
          text="Log in"
        />
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}