import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, Button } from 'react-native'
import { Components } from "./Components";
import AsyncStorage from "@react-native-community/async-storage";
import BatteryBar from './BatteryBar';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-4785007038647034/5711849307';

export class HomeScreen extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = async () => {
        await AsyncStorage.getItem('settone').then((value) => {
            console.log(value)
        })
    }

    NavigationDrawerStructure = (props) => {
        const toggleDrawer = () => {
            this.props.navigation.openDrawer();
        };
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => toggleDrawer()}>
                    <Image
                        source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png' }}
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: '15%' }}>CHARGING REMINDER</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black',height:'100%' }}>
                <View style={{ backgroundColor: 'black', height: 60, justifyContent: 'center' }}>
                    {this.NavigationDrawerStructure()}
                </View>
                    <BatteryBar />
                    <Components navigate={this.props.navigation.navigate} />
                <View style={{position:'absolute',bottom:0}}>
                    <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.SMART_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                </View>
            </View>
        )
    }
}

export default HomeScreen