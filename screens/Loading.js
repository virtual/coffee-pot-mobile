import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { COLOR, ThemeProvider, Button, Toolbar } from 'react-native-material-ui';
import { StackNavigator } from 'react-navigation';
import Container from '../Container';
import CoffeePot from '../svgComponents/svg/Coffee-pot'

export default class Main extends Component {
  render() {
    return (
         <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          <View style={styles.svgSm}>
          <CoffeePot fillColor="#fff" />
          </View>
          <Text style={styles.status}>0% complete</Text>
        </View>
    );
  }
}
 
const styles = StyleSheet.create({
  svgSm: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  status: {
    textAlign: 'center',
    fontSize: 20, 
    flex: 1,
    color: '#fff'
  }
});