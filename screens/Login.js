import React from 'react';
import { Button, StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import tabstyle from '../styles';
var axios = require('axios');

export default class Login extends React.Component {
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
      <Image source={require('../images/main-background.jpg')} style={styles.backgroundImage}> 
      <Image source={require('../images/1.png')} style={styles.logo}/>
        <Text style={styles.titles}>Username:</Text>
        <TextInput style={styles.inputText}
        onChangeText={(text) => this.updateUsername(text)}
        value={this.state.username}/>  
        <Text style={styles.titles}>Password:</Text>
        <TextInput style={styles.inputText}
        onChangeText={(text) => this.updatePassword(text)}
        value={this.state.password}
        secureTextEntry={true}
        />
        <Button style={styles.loginButton} 
        title='Login'
        onPress={() => this.submitLogin(this.state.username, this.state.password)} />
     </Image>
    )
  }
} 

const styles = StyleSheet.create({
  logo:{
  },
  inputText:{
    height: 40, 
    width: 220,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white'
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
    marginTop: 5,
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
  }
});