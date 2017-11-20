import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native'; 
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import Main from './screens/Main.js';
import Login from './screens/Login.js';
import { StackNavigator } from 'react-navigation';
 

const SimpleApp = StackNavigator({
  Main: { screen: Main },
  Login: { screen: Login }
});
 

export default class App extends React.Component {  
  
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
         <SimpleApp />
      </ThemeProvider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// you can set your style right here, it'll be propagated to application
const uiTheme = {
   palette: {
        primaryColor: COLOR.brown500,
        accentColor: COLOR.pink500,
    },
  toolbar: {
      container: {
          height: 150,
      },
  },
};

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);