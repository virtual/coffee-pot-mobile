import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { COLOR, ThemeProvider, Button, Toolbar } from 'react-native-material-ui';
import { StackNavigator } from 'react-navigation';
import Container from '../Container';
import CoffeePot from '../svgComponents/svg/Coffee-pot'

export default class Main extends Component {
  
  static navigationOptions = {
    
    title: "Now Brewing...",
    tabBarLabel: 'Brew Status',
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
         <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
            
        <View style={styles.svgSm}>
        <CoffeePot />
        </View>
        </View>
        <Text style={styles.status}>0% complete</Text>
      </Container>
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
    fontSize: 20
  }
  
});