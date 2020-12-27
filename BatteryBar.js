import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from "react-native-svg";
import DeviceBattery from 'react-native-device-battery';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons  from "react-native-vector-icons/Ionicons";

export class BatteryBar extends Component {
    constructor() {
        super()
        this.state = {
            fill: 0,
            isCharge:false
        }   
    }

    onBatteryStateChanged = (state) => {
        var percentage = (state.level)*100;
        percentage = percentage.toFixed(0);
        this.setState({
            isCharge: state.charging,
            fill:percentage
        })
    };

    componentDidMount() {
        DeviceBattery.addListener(this.onBatteryStateChanged);
    }

    componentWillUnmount() {
        DeviceBattery.removeListener(this.onBatteryStateChanged);
    }


    render() {
        return (
            <View style={{flexDirection:'row',backgroundColor:'black',padding:10 }}>
                <View style={{flex:.5,backgroundColor:'black',padding:10}}>
                    <AnimatedCircularProgress
                        size={160}
                        width={10}
                        fill={this.state.fill}
                        tintColor="white"
                        backgroundColor="black">
                        {
                            (fill) => (
                                <Text style={{ fontSize: 40,color:'white' }}>
                                    { this.state.fill}%
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
                <View style={{flex:.5,backgroundColor:'black',alignItems:'center',justifyContent:'space-around'}} >
                    {
                        this.state.isCharge==true?
                        <View >
                        <Ionicons  name="battery-charging" color="#008000" size={120} />
                        </View>
                        :
                        <View>
                        <FontAwesome  name="battery-quarter" color="#e60000" size={75} />
                        </View>
                    }
                </View>

            </View>
        )
    }
}

export default BatteryBar
