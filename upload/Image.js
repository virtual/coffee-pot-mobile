import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Button,
  Text,
  Image,
  Alert,
  View
} from 'react-native';


const FilePickerManager = require('NativeModules').FilePickerManager;


export default class UploadImage extends Component {

   constructor() {
		super()
   };
 
   onPressLearnMore(){
FilePickerManager.showFilePicker(null, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled file picker');
  }
  else if (response.error) {
    console.log('FilePickerManager Error: ', response.error);
  }
  else {
    this.setState({
      file: response
    });
  }
});

//Alert.alert('Button has been pressed!');
};

   render() {
    return (
	
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Button onPress={this.onPressLearnMore.bind(this)} title="Upload Image" color="#841584" accessibilityLabel="Learn more about this purple button" />
      </View>
    );
  }
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('UploadImage', () => UploadImage);