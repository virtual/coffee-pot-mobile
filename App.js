import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import Main from './Main.js';
import { StackNavigator } from 'react-navigation';

const HomeScreen = () => (
  <Main />
);

const DetailsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen</Text>
  </View>
);
 

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen }
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
      primaryColor: COLOR.green500,
  },
  toolbar: {
      container: {
          height: 50,
      },
  },
};
 