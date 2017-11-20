import { View, StyleSheet, StatusBar } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.brown100, 
        height: 24,
        padding: 16
    },
    
});


export default class Container extends Component {
  constructor() {
    super();
  }
    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}
  