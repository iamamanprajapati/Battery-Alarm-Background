import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export class Profile extends Component {
    render() {
        return (
            <View>
                <Text> Profile </Text>
                <Button title="Home"
                    onPress={()=>
                        this.props.navigation.navigate('Home')
                    }
                >Home</Button>
            </View>
        )
    }
}

export default Profile
