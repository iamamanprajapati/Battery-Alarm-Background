import React, { Component } from 'react'
import { Text, View, StatusBar,Button } from 'react-native'
import Header from "./Header";
import StackNav from './StackNav';

export class App extends Component {
  stopNotification = () =>{
    stopSampleSound()
  }

  
  render() {
    return (
      <View style={{flex:1}}>
        {/* <Button title="click me" onPress={()=>this.stopNotification()}/> */}
        <StatusBar backgroundColor="black" />
        {/* <Header /> */}
        <StackNav/>
        {/* <RingtoneList/> */}
      </View>
    )
  }
}



export default App
