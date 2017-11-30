import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native'; 
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';
import { Provider } from 'mobx-react/native';
import Main from './screens/Main';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Coffee from './screens/Coffee';
import Chipper from './screens/Chipper';
import Loading from './screens/Loading';
import { StackNavigator } from 'react-navigation';
import UserStore from './stores/UserStore'


const SimpleApp = StackNavigator({
  Main: { screen: Main },
  Signup: { screen: Signup },
  Login: { screen: Login },
  Loading: { screen: Loading },
  Coffee: { screen: Coffee },
  Chipper: { screen: Chipper }
});
 
export default class App extends React.Component {  
  
  render() {
    return (
      <Provider store={UserStore}>
        <ThemeProvider uiTheme={uiTheme} store={{store: UserStore}}>
          <SimpleApp screenProps={{ store: UserStore }} />
        </ThemeProvider>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

// you can set your style right here, it'll be propagated to application
const uiTheme = {
   palette: {
        primaryColor: COLOR.teal600,
        accentColor: COLOR.teal800,
    },
  toolbar: {
      container: {
          height: 150,
      },
  },
};

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);