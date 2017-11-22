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
    this.submitLogin = this.submitLogin.bind(this);
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

  submitLogin(a, b) {
    const { navigate } = this.props.navigation;    
    console.log('trying to login')
    return new Promise((resolve, reject)=>{
      axios.post('http://192.168.0.22:5000/login', {
            username: a,
            password: b,
    }).then((res) => {
        console.log(res);
        this.setState({
          currentUser: res.data,
          message: res.data.message
        });
        if (res.data.found) {
          navigate('Main');
          resolve(res.data)
        } else {
          reject(res.data);
        }
      }).catch(e => {
        console.log(e);
        console.log(e.message)
        this.setState({
          message: e.message
        })
      });
    });
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
        onPress={() => this.submitLogin(this.state.username, this.state.password)} />
        <Text style={styles.message}>{ this.state.message }</Text>
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