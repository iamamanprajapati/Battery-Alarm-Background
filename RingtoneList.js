import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, BackHandler, Alert, StyleSheet, StatusBar, SafeAreaView, FlatList } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationSounds, { playSampleSound, stopSampleSound } from 'react-native-notification-sounds';
import AsyncStorage from '@react-native-community/async-storage';

const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
);

export class RingtoneList extends Component {

    constructor() {
        super()
        this.state = {
            toneList: [],
            selectedId: null
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
        NotificationSounds.getNotifications('ringtone').then(soundList => {
            this.setState({
                toneList: soundList
            })
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    selectRingtone = (item) => {
        this.setState({
            selectedId: item.soundID
        })
        console.log(item.url)
        AsyncStorage.setItem('settone', JSON.stringify(item));
        playSampleSound(item);
    }

    renderItem = ({ item }) => {
        const backgroundColor = item.soundID === this.state.selectedId ? "#999999" : "#f2f2f2";
        const borderRadius = 10
        return (
            <Item
                item={item}
                onPress={() => this.selectRingtone(item)}
                style={{ backgroundColor,borderRadius }}
            />
        );
    };


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
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: '15%' }}>CHARGING REMINDER</Text>
                        </View>
                    </View>
                </View>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.toneList}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.soundID}
                        extraData={this.state.selectedId}
                    />
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight:'bold',
        color:'#194d19'
    },
});


export default RingtoneList