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
        
        <Button raised primary
          onPress={() => navigate('Login')}
          title="Login.."
          text="Log in"
        /> 
        <Button raised secondary
        onPress={() => navigate('Loading')}
        title="Loading"
        text="Loading"
      />
      <Button raised secondary
        onPress={() => navigate('Coffee')}
        title="Coffee"
        text="Coffee"
      />
        <Text>Revolutionize your coffee process

</Text>
        <Text>Get your piece of the Coffee Pot "Pi"

1
Request more coffee
2
Coffee is brewed
3
Drink fresh coffee without wasting extra</Text>
      </Container>
    );
  }
}