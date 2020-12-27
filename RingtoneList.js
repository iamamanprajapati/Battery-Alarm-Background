import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, BackHandler, Alert } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationSounds, { playSampleSound, stopSampleSound } from 'react-native-notification-sounds';
import AsyncStorage from '@react-native-community/async-storage';
export class RingtoneList extends Component {

    constructor() {
        super()
        this.state = {
            toneList: []
        }
    }

    toggleDrawer = () => {
        this.props.navigation.openDrawer();
    }

    backAction = () => {
        stopSampleSound();
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        NotificationSounds.getNotifications('media').then(soundList => {
            this.setState({
                toneList: soundList
            })
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    selectRingtone = (list) => {
        console.log(list)
        AsyncStorage.setItem('settone', JSON.stringify(list));
        playSampleSound(list);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ backgroundColor: 'black', height: 60, justifyContent: 'center' }}>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => this.toggleDrawer()}>
                                <Image
                                    source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png' }}
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: '15%' }}>BATTERY FULL ALARM</Text>
                        </View>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    {
                        this.state.toneList.map(list => (
                            <TouchableOpacity style={{ backgroundColor: '#e6e6e6', height: 60, width: "90%", borderRadius: 10, marginTop: 8, marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => this.selectRingtone(list)}
                            >
                                <View >
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontWeight: 'bold', color: '#004d00' }}>{list.title}</Text>
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }

                </ScrollView>
            </View>
        )
    }
}

export default RingtoneList