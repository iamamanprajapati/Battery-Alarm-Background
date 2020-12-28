import React, { Component } from 'react'
import { Text, View, Switch, Button } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import BackgroundJob from 'react-native-background-actions';
import DeviceBattery from 'react-native-device-battery';
import NotificationSounds, { playSampleSound, stopSampleSound } from 'react-native-notification-sounds';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';


const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const options = {
    taskName: 'Example',
    taskTitle: 'Full Battery Alarm',
    taskDesc: 'ExampleTask desc',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'exampleScheme://chat/jane',
    parameters: {
        delay: 1000,
    },
};

export class Components extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slider: 10,
            isAlarm: false,
            isVibrate: false,
            batteryPercentage: 0
        }
    }

    playing = BackgroundJob.isRunning();

    toggleBackground = async () => {
        this.playing = !this.playing;
        if (this.playing) {
            try {
                console.log('Trying to start background service');
                await BackgroundJob.start(this.taskRandom, options);
                console.log('Successful start!');
            } catch (e) {
                console.log('Error', e);
            }
        } else {
            console.log('Stop background service');
            await BackgroundJob.stop();
        }
    };

    taskRandom = async taskData => {
        await new Promise(async resolve => {
            const { delay } = taskData;
            var val = 0
            for (let i = 0; BackgroundJob.isRunning(); i++) {

                DeviceInfo.getBatteryLevel().then(batteryLevel => {
                    let percentage = (batteryLevel) * 100;
                    percentage = percentage.toFixed(0);
                    // console.log(percentage)
                    BackgroundJob.updateNotification({ taskDesc: 'Battery  ' + percentage + '%' });
                    this.setState({
                        batteryPercentage: percentage
                    })
                    // console.log(Number(percentage))

                    if (percentage === "100" && (val === 0 || val === 1)) {
                        AsyncStorage.getItem('settone').then(tone => {
                            console.log(tone)
                            playSampleSound(JSON.parse(tone))
                            val = val + 3
                        })
                    }

                    if (Number(percentage) === this.state.slider && val === 0) {
                        AsyncStorage.getItem('settone').then(tone => {
                            console.log(tone)
                            playSampleSound(JSON.parse(tone))
                            val = val + 1
                        })
                    }
                });
                await sleep(delay);
            }
        });
    };

    componentDidMount() {
        AsyncStorage.getItem('alarmValue').then(value => {
            this.setState({
                isAlarm: JSON.parse(value)
            })
        })
    }

    setAlarm = (value) => {
        AsyncStorage.setItem('alarmValue', JSON.stringify(value))
        this.setState({
            isAlarm: value
        })
        this.toggleBackground()
    }

    setVibration = (val) => {
        this.setState({
            isVibrate: val
        })
    }

    ringtoneScreen = (props) => {
        this.props.navigate('RingtoneList')
    }

    setSliderValue = (sliderValue) => {
        this.setState({
            slider: sliderValue
        })
    }

    run = () => {
        console.log('run')
    }


    render() {
        return (
            <View >
                <View style={{ alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#FFF0F5', height: 60, width: "90%", borderRadius: 10, marginTop: 8, marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginLeft: 10, flex: 1 }}>
                            <MaterialCommunityIcons
                                name="bell-alert"
                                size={32}
                                color="green"
                            />
                        </View>
                        <View style={{ marginLeft: 10, flex: 4 }}>
                            <Text style={{ fontWeight: 'bold', color: '#004d00' }}>On alarm when full battery?</Text>
                        </View>
                        <View style={{ flex: 1.5, marginRight: 10 }}>
                            <Switch
                                value={this.state.isAlarm}
                                onValueChange={(val) => this.setAlarm(val)}
                                circleSize={20}
                                barHeight={10}
                                circleBorderWidth={1}
                                backgroundActive={'green'}
                                backgroundInactive={'gray'}
                                circleActiveColor={'#30a566'}
                                circleInActiveColor={'#000000'}
                            />
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#FFF0F5', height: 60, width: "90%", borderRadius: 10, marginTop: 8, marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginLeft: 10, flex: 1 }}>
                            <MaterialCommunityIcons
                                name="bell"
                                size={32}
                                color="green"
                            />
                        </View>
                        <View style={{ marginLeft: 10, flex: 5 }}>
                            <Text style={{ fontWeight: 'bold', color: '#004d00' }}>Set Ringtone</Text>
                        </View>
                        <View style={{ flex: 1.5 }}>
                            <MaterialCommunityIcons
                                name="chevron-triple-right"
                                size={32}
                                color="green"
                                onPress={() => this.ringtoneScreen()}
                            />
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#FFF0F5', height: 60, width: "90%", borderRadius: 10, marginTop: 8, marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginLeft: 10, flex: 1 }}>
                            <MaterialCommunityIcons
                                name="vibrate"
                                size={32}
                                color="green"
                            />
                        </View>
                        <View style={{ marginLeft: 10, flex: 5 }}>
                            <Text style={{ fontWeight: 'bold', color: '#004d00' }}>Vibrate when full battery</Text>
                        </View>
                        <View style={{ flex: 1.5, marginRight: 10 }}>
                            <Switch
                                value={this.state.isVibrate}
                                onValueChange={(val) => this.setVibration(val)}
                                circleSize={20}
                                barHeight={10}
                                circleBorderWidth={1}
                                backgroundActive={'green'}
                                backgroundInactive={'gray'}
                                circleActiveColor={'#30a566'}
                                circleInActiveColor={'#000000'}
                                renderActiveText={false}
                            />
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#FFF0F5', height: 60, width: "90%", borderRadius: 10, marginTop: 8, marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginLeft: 10 }}>
                            <MaterialCommunityIcons
                                name="bell-minus"
                                size={32}
                                color="green"
                            />
                        </View>
                        <View style={{ marginLeft: 10, }}>
                            <Text style={{ fontWeight: 'bold', color: '#004d00' }}>set battery percentage for alarm</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Slider
                        style={{ width: "70%", alignSelf: 'center' }}
                        maximumValue={100}
                        minimumValue={10}
                        minimumTrackTintColor="#307ecc"
                        maximumTrackTintColor="white"
                        step={1}
                        value={this.state.slider}
                        onValueChange={
                            (sliderValue) => this.setSliderValue(sliderValue)
                        }
                    />
                    <Text style={{ color: "white", alignSelf: 'center' }}>{this.state.slider}%</Text>
                </View>

            </View>
        )
    }
}

export default Components;