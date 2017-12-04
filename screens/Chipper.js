import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, TextInput, View, StatusBar, FlatList } from 'react-native';
import tabstyle from '../styles';
import { Subheader, ListItem, Divider, COLOR, ThemeProvider, Button, Avatar, Badge } from 'react-native-material-ui';
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
      //let img = (data.image !== undefined) ? data.image : 'https://coffee-pot-pi.herokuapp.com/images/default.png'
      let img = 'https://coffee-pot-pi.herokuapp.com/images/default.png'
      if (data.image  !== 'undefined') { img = data.image; } 
       return (
         <View key={'chipper'+i} style={{width:'100%'
  }}>
          
           <View style={{ 
    backgroundColor: 'rgba(0,0,0,.3)',
    width: '100%', marginBottom: 10, padding: 10,  justifyContent: 'flex-start', display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
              <View >
               <Image 
               style={{width: 50, height: 50}}
               source={{uri: img}} 
               alt={data.firstname}
               >
               </Image>
               <Badge
             size={24}
             text={''+data.cupcount}
             style={{ container: { bottom: -8, right: -12 } }}
           />
           </View>
           <View style={{paddingLeft: 12}}>
             <Text style={{fontWeight: 'bold', color: "#fff"}}>{data.firstname}</Text>
           </View>
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
        <Text style={{ backgroundColor: 'rgba(255,255,255,.6)', padding: 5, paddingLeft:8, paddingRight: 8,    fontWeight: 'bold', color: COLOR.teal800, fontSize: 20}}>Total:  {nullifier}</Text>
      </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  avatarColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginTop: 20
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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