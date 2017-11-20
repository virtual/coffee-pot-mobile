import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import tabstyle from '../styles';
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import Container from '../Container'
var axios = require('axios');

export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login",
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
  )
}
  constructor(){
    super()
    this.submitLogin = this.submitLogin.bind(this);
    this.state = {
      username: "",
      password: "",
      currentUser: {
        firstName: ""
      }
    }
  }



  updateUsername(text){
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
    return new Promise((resolve, reject)=>{
      axios.post('/login', {
            username: a,
            password: b,
    }).then((res) => {
        console.log(res);
          resolve(res.data);
          this.setState({
            currentUser: res.data
          })
      });
    });
  }


  render() {
    const { navigate } = this.props.navigation    
    return (
      <Container>
        <Text style={styles.logo}>Coffee Pot Pi logo</Text>
        <TextInput style={styles.inputText}
        onChangeText={(text) => this.updateUsername(text)}
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
     </Container>
    )
  }
} 

const styles = StyleSheet.create({
 
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