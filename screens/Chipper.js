import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, TextInput, View, StatusBar } from 'react-native';
import tabstyle from '../styles';
import { Subheader, Divider, COLOR, ThemeProvider, Button, Avatar, Badge } from 'react-native-material-ui';
import {inject, observer} from "mobx-react/native";
import Container from '../Container';
import { StackNavigator } from 'react-navigation';
var axios = require('axios');

@inject('store') @observer
export default class Chipper extends React.Component {
  static navigationOptions = {
    title: "Chipper",
    tabBarLabel: 'Chipper',
    headerStyle: {
      backgroundColor: COLOR.teal800
    },
    headerTintColor: '#fff',

    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/notification-icon.png')}
        style={[tabstyle.icon, { tintColor: tintColor }]}

      />
    )
  }
  constructor(){
    super()
    this.arrayBlaster = this.arrayBlaster.bind(this)
  }

  arrayBlaster(data, i) {
    if (data) {
      console.log("img")
      //let img = (data.image !== undefined) ? data.image : 'https://coffee-pot-pi.herokuapp.com/images/default.png'
      let img = 'https://coffee-pot-pi.herokuapp.com/images/default.png'
      if (data.image  !== 'undefined') { img = data.image; } 
      console.log(img);
       return (
         <View>
           <View style={{ paddingBottom: 20}}>
               <Image 
               style={{width: 50, height: 50}}
               source={{uri: img}} 
               alt={data.firstname}
               >
               </Image>
               <Badge
             size={24}
             text={data.cupcount}
             style={{ container: { bottom: -8, right: -12 } }}
           />
 </View>
          
           
          </View>
        )
    } else {
      return null
    }
  }



  render() {
    let nullifier = this.props.store.user.totalCount
    if (!this.props.store.user.totalCount) {
      nullifier = 0
    }
    let masterBlaster = this.props.store.user.users;
    return (
      <View style={styles.avatarColumn}>
        {masterBlaster.map(this.arrayBlaster, this)}
      <View style={styles.avatarRow}>
        <Text>Total: </Text><Text>{nullifier}</Text>
      </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  avatarColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  message: {
    textAlign: 'center',
    padding: 8,
    marginTop: 8,
    fontStyle: 'italic'
  },
  inputText: {
    height: 40,
    borderColor: COLOR.brown100,
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 8,
    padding: 8
  },
  logo: {
    textAlign: 'center',
    fontSize: 20,
    padding: 16
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titles: {
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  },
  loginButton: {
    marginTop: 5
  }
});