import React from 'react';
import { View, StyleSheet, Image, Linking,Share } from 'react-native';
import {
  useTheme,
  Drawer,
  Text,
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';


import Icon from 'react-native-vector-icons/MaterialIcons';


export function DrawerContent(props) {

  const paperTheme = useTheme();


  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Image
                style={{ height: 150, width: 120 }}
                source={require(`./assets/Battery.png`)}
              />
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="star-rate"
                  color='white'
                  size={30}
                />
              )}
              label={() => <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Rate Us</Text>}
              onPress={() => { Linking.openURL(`https://play.google.com/store/apps/developer?id=in.kwikittlabs.chargingreminder`) }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="share"
                  color='white'
                  size={30}
                />
              )}
              label={() => <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Share</Text>}
              onPress={() => {  
                try {
                  const result = Share.share({
                    message:
                      'If your battery becomes full then alarm will ring or you can set percentage || Charging Remoder Application . https://play.google.com/store/apps/details?id=in.kwikittlabs.chargingreminder',
                  });
                  if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                      // shared with activity type of result.activityType
                    } else {
                      // shared
                    }
                  } else if (result.action === Share.dismissedAction) {
                    // dismissed
                  }
                } catch (error) {
                  Alert.alert(error.message);
                }
               }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="apps"
                  color='white'
                  size={30}
                />
              )}
              label={() => <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Our Apps</Text>}
              onPress={() => {
                Linking.openURL(`https://play.google.com/store/apps/developer?id=kwikitt+labs`)
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="info-outline"
                  color='white'
                  size={30}
                />
              )}
              label={() => <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>About Us</Text>}
              onPress={() => { Linking.openURL(`https://kwikittlabs.com`) }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});