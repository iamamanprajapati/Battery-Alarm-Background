import React, { Component } from 'react'
import { Text, View, StatusBar,Button,Alert ,Linking} from 'react-native'
import Header from "./Header";
import StackNav from './StackNav';
import axios from 'axios'

export class App extends Component {
  constructor(){
    super()
    global.MyVar = 'http://147.139.33.186';
  }
  stopNotification = () =>{
    stopSampleSound()
  }

  componentDidMount(){
    this.getData()
  }

  getData = async () => {
    try {
      axios
        .post(`${global.MyVar}/app-version/validate`, {
          packageName:'in.kwikittlabs.chargingreminder',
          platform: 'ANDROID',
          version: '2.0.0',
        })
        .then((response) => {
          if (response.data.data.status === false) {
            Alert.alert(
              'please update the app to use more services',
              '',
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: 'Yes', onPress: this.openURL },
              ],
              { cancelable: true }
            )
          }
        });
    } catch (e) {
      console.warn(e);
    }
  };

  openURL = () => {
    Linking.openURL('market://details?id=in.kwikittlabs.chargingreminder');
  };

  
  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor="black" />
        <StackNav/>
      </View>
    )
  }
}


export default App

console.disableYellowBox = true;

