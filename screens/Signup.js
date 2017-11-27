import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import tabstyle from '../styles';
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import Container from '../Container';

import { StackNavigator } from 'react-navigation';
var axios = require('axios');

export default class Signup extends React.Component {
  static navigationOptions = {
    title: "Signup",
    tabBarLabel: 'Signup',
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
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      message: '',
      confirmPassword: "",
    }
  }

  updateEmail(text) {
    this.setState({
      email: text
    })
  }

  updateFirstName(text) {
    this.setState({
      firstName: text
    })
  }

  updateLastName(text) {
    this.setState({
      lastName: text
    })
  }


  updatePassword(text) {
    this.setState({
      password: text
    })
  }

  updateConfirmPassword(text) {
    this.setState({
      confirmPassword: text
    })
  }

  handleSignup() {
    const { navigate } = this.props.navigation;

    if (this.state.firstName !== '' && this.state.lastName !== '' && this.state.email !== '' && this.state.password !== '') {
      if (this.state.password) {
        this.submitSignup({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        }).then((returned) => {
          if (returned.data[0].id) {
            navigate('Login');
          }
        });
      } else {
        this.setState({
          message: "Passwords do not match"
        })
      }
    } else {
      this.setState({
        message: "Fill out all fields"
      })
    }
  }

  submitSignup(signupObj) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:5000/signup', {
        firstName: signupObj.firstName,
        lastName: signupObj.lastName,
        email: signupObj.email,
        password: signupObj.password,
      }
      ).then((userObj) => {
        if (userObj.data.message == 'An account is already associated with that email address.') {
          this.setState({
            message: userObj.data.message
          })
          reject(userObj);
        } else {
          this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            message: userObj.data.message
          })
        }
        resolve(userObj);
      }).catch(e => {
          console.log(e);
          console.log(e.message)
          this.setState({
            message: e.message
          })
        });
    })
  }




  render() {
    return (
      <Container>
        <Text style={styles.logo}>Create an Account</Text>
        <Text>Create an account to :
          • track your coffee </Text>

        <TextInput 
        autoFocus={true}
        style={styles.inputText}
          label="First Name"
          onChangeText={(text) => this.updateFirstName(text)}
          placeholder="Jane"
          value={this.state.firstName} />
        <TextInput style={styles.inputText}
          onChangeText={(text) => this.updateLastName(text)}
          value={this.state.lastName}
          placeholder="Smith"
        />

        <TextInput style={styles.inputText}
          onChangeText={(text) => this.updateEmail(text)}
          placeholder="Email"
          type="email"
          value={this.state.email} />
        <TextInput style={styles.inputText}
          onChangeText={(text) => this.updatePassword(text)}
          value={this.state.password}
          secureTextEntry={true}
          placeholder="Password"
        />

        <Button raised primary
          style={styles.submitButton}
          title='Signup'
          text="Signup"
          onPress={() => this.handleSignup(this.state.email, this.state.password)} />
        <Text style={styles.message}>{this.state.message}</Text>
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
  submitButton:{
    marginTop: 5 
  }
});