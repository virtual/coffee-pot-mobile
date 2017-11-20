import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { COLOR, ThemeProvider, Button, Toolbar } from 'react-native-material-ui';
import { StackNavigator } from 'react-navigation';
import Container from '../Container';

export default class Main extends Component {
  
  static navigationOptions = {
    
    title: "Coffee Pot Pi",
    tabBarLabel: 'Login',
    headerStyle: {
        backgroundColor: COLOR.brown500,
    },
    headerTintColor: '#fff',
    
    tabBarIcon: ({ tintColor }) => (
      <Image
      source={require('../images/notification-icon.png')}
      style={[tabstyle.icon, { tintColor: tintColor }]}
 
    />
  ),
  
}

  render() {
    const { navigate } = this.props.navigation;    
    return (
      <Container>
        
        <Text>Main j!!s !2!</Text>
        <Button raised primary
          onPress={() => navigate('Login')}
          title="Login"
          text="Log in"
        />
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </Container>
    );
  }
}