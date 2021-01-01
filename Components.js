import React, { Component } from 'react'
import { Text, View, Switch, Button, Linking } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import BackgroundJob from 'react-native-background-actions';
import DeviceBattery from 'react-native-device-battery';
import NotificationSounds, { playSampleSound, stopSampleSound } from 'react-native-notification-sounds';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
Linking.addEventListener('url', handleOpenURL);

function handleOpenURL(evt) {
    console.log(evt)
}

const options = {
    taskName: 'Example',
    taskTitle: 'Full Battery Alarm',
    taskDesc: 'ExampleTask desc',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane',
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
            batteryPercentage: 0,
            displayAlarm: false,
            isSlider: false
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
                    BackgroundJob.updateNotification({ taskDesc: 'Battery  ' + percentage + '%' });
                    this.setState({
                        batteryPercentage: percentage
                    })


                    if (this.state.isAlarm === true) {
                        console.log(100)
                        if (percentage === "100" && (val === 0 || val === 1)) {
                            AsyncStorage.getItem('settone').then(tone => {
                                console.log(tone)
                                playSampleSound(JSON.parse(tone))
                                val = val + 3
                            })
                        }
                    }

                    if (this.state.isSlider === true) {
                        AsyncStorage.getItem('setSliderValue').then(value => {
                            const sliderVal = JSON.parse(value)
                            console.log(sliderVal)
                            if (Number(percentage) === sliderVal && val === 0) {
                                AsyncStorage.getItem('settone').then(tone => {
                                    console.log(tone)
                                    playSampleSound(JSON.parse(tone))
                                    val = val + 1
                                })
                                this.setState({
                                    displayAlarm: true
                                })
                            }
                        })
                    }
                });
                await sleep(delay);
            }
        });
    };


    componentDidMount() {
        AsyncStorage.getItem('setSliderValue').then(value => {
            console.log(JSON.parse(value))
            this.setState({
                slider: JSON.parse(value)
            })
        })
        AsyncStorage.getItem('settone').then(tone => {
            if (tone === null) {
                NotificationSounds.getNotifications('media').then(soundList => {
                    AsyncStorage.setItem('settone', JSON.stringify(soundList[0]));
                })
            }
        })

        AsyncStorage.getItem('sliderSwitch').then(value => {
            // console.log(JSON.parse(value))
            this.setState({
                isSlider: JSON.parse(value)
            })
        })

        AsyncStorage.getItem('alarmSwitch').then(value => {
            this.setState({
                isAlarm: JSON.parse(value)
            })
        })
    }

    setAlarm = (value) => {
        AsyncStorage.setItem('alarmSwitch', JSON.stringify(value))
        this.setState({
            isAlarm: value
        })
        NotificationSounds.getNotifications('notification').then(soundList => {
            playSampleSound(soundList[0])
        })
        if (this.state.isSlider === true) {
            console.log("slider is already true")
        }
        else {
            this.toggleBackground()
        }

    }

    setSliderSwitch = (val) => {

        AsyncStorage.setItem('sliderSwitch', JSON.stringify(val))
        this.setState({
            isSlider: val
        })

        NotificationSounds.getNotifications('notification').then(soundList => {
            playSampleSound(soundList[0])
        })

        if (this.state.isAlarm === true) {
            console.log("alarm is already true")
        }
        else {
            this.toggleBackground()
        }
    }

    ringtoneScreen = (props) => {
        this.props.navigate('RingtoneList')
    }

    setSliderValue = (sliderValue) => {
        AsyncStorage.setItem('setSliderValue', JSON.stringify(sliderValue))
        this.setState({
            slider: sliderValue
        })
    }

    renderSliderForAlarm = () => {
        return (
            this.state.isSlider === true ?
                <View>
                    <View style={{ backgroundColor: '#FFF0F5', height: 60, width: "90%", borderTopLeftRadius: 10, borderTopColor: 'black', borderBottomWidth: .07, borderTopRightRadius: 10, marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginLeft: 10,flex:1 }}>
                            <MaterialCommunityIcons
                                name="bell-minus"
                                size={32}
                                color="green"
                            />
                        </View>
                        <View style={{ marginLeft: 10,flex:4 }}>
                            <Text style={{ fontWeight: 'bold', color: '#004d00' }}>set battery percentage for alarm</Text>
                        </View>
                        <View style={{ flex: 1.5, marginRight: 10 }}>
                            <Switch
                                value={this.state.isSlider}
                                onValueChange={(val) => this.setSliderSwitch(val)}
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
                    <View style={{ backgroundColor: '#FFF0F5', height: 60, width: "90%", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginBottom: 5, alignItems: 'center' }}>
                        <View style={{ width: '100%', flexDirection: 'row', }}>
                            <Slider
                                style={{ width: "100%", marginTop: 15 }}
                                maximumValue={100}
                                minimumValue={10}
                                minimumTrackTintColor="#307ecc"
                                maximumTrackTintColor="#bfbfbf"
                                step={1}
                                value={this.state.slider}
                                onValueChange={
                                    (sliderValue) => this.setSliderValue(sliderValue)
                                }
                            />
                        </View>
                        <Text style={{ color: "black" }}>{this.state.slider}%</Text>
                    </View>
                </View>
                :
                <View style={{ backgroundColor: '#FFF0F5', height: 60, width: "90%", borderRadius: 10, marginTop: 8, marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginLeft: 10,flex:1 }}>
                        <MaterialCommunityIcons
                            name="bell-minus"
                            size={32}
                            color="green"
                        />
                    </View>
                    <View style={{ marginLeft: 10,flex:4 }}>
                        <Text style={{ fontWeight: 'bold', color: '#004d00' }}>set battery percentage for alarm</Text>
                    </View>
                    <View style={{ flex: 1.5, marginRight: 10 }}>
                        <Switch
                            value={this.state.isSlider}
                            onValueChange={(val) => this.setSliderSwitch(val)}
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
        )
    }

    render() {
        return (
            <View >
                <View style={{ alignItems: 'center', backgroundColor: 'black' }}>
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


                    {
                        this.renderSliderForAlarm()
                    }

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

                </View>

            </View>
        )
    }
}

export default Components;