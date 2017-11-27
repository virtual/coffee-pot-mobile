import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import tabstyle from '../styles';
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import Container from '../Container';

import { StackNavigator } from 'react-navigation';
var axios = require('axios');

export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login",
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
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      username: "",
      password: "",
      currentUser: {
        firstName: "hi"
      }
    }
  }



  updateEmail(text){
    this.setState({
      username: text
    })
  }

  updatePassword(text){
    this.setState({
      password: text
    })
  }

  handleLogin() {
    const { navigate } = this.props.navigation;    
    this.props.screenProps.store.submitLogin(this.state.username, this.state.password).then((returned)=>{
      if (returned.found) {
        navigate('Main');
      }
    })
  }

  

  render() {
    return (
      <Container>
        <Text style={styles.logo}>Login with your email</Text>
        <TextInput style={styles.inputText}
        onChangeText={(text) => this.updateEmail(text)}
        placeholder="Email"        
        value={this.state.username}/>  
        <TextInput style={styles.inputText}
        onChangeText={(text) => this.updatePassword(text)}
        value={this.state.password}
        secureTextEntry={true}
        placeholder="Password"
        />
        <Button raised primary 
        style={styles.submitButton}
        title='Login'
        text="Login"
        onPress={() => this.handleLogin()} />
        <Text style={styles.message}>{ this.props.screenProps.store.message }</Text>
     </Container>
    )
  }
} 

const styles = StyleSheet.create({
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