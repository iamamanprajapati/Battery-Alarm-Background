import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RingtoneList from './RingtoneList';
import Header from './Header';

const Stack = createStackNavigator();

export class StackNav extends Component {
     
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode='none'>
                    <Stack.Screen name="Home" component={Header}/>
                    <Stack.Screen name="RingtoneList" component={RingtoneList} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default StackNav
