import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
        <Button raised primary text="Login"/>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
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
 