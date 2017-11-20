import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';

export default class Main extends Component {
  render() {
    return (
      <View>
        <Button raised primary text="Login"/>
        <Text>Main js </Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}