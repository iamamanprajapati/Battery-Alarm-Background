import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from "./Profile";
import { Home } from "./Home";

const Stack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
);

export default RootStackScreen;

