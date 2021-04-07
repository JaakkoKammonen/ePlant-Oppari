import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

// bottom navigation
import Koti from './src/screens/Koti';
import Haku from './src/screens/Haku';
import Add from './src/screens/01LisaaKasvi';
import Notifications from './src/screens/Notifications';
import Settings from './src/screens/Settings';

// switch navigation
import Plant from './src/screens/Plant';
import MyPlant from './src/screens/MyPlant';
import LisaaKasvi from './src/screens/01LisaaKasvi';
import SelectName from './src/screens/SelectName';
import SelectPot from './src/screens/SelectPot';

//creating bottom navigation
const BottomNavigator = createBottomTabNavigator(
    {
        Koti: {
            screen: Koti,
            navigationOptions: {
                tabBarLabel: 'Koti',
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="ios-home" color={tintColor} size={25} />
                )
            }
        },

        Haku: {
            screen: Haku,
            navigationOptions: {
                tabBarLabel: 'Haku',
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="ios-search" color={tintColor} size={25} />
                )
            }
        },
        Add: {
            screen: Add,
            navigationOptions: {
                tabBarLabel: 'Add',
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="ios-add-circle" color={"#63816D"} size={70} />
                )
            }
        },
        Notifications: {
            screen: Notifications,
            navigationOptions: {
                tabBarLabel: 'Notifications',
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="ios-notifications-outline" color={tintColor} size={25} />
                )
            }
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                tabBarLabel: 'Settings',
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="ios-settings" color={tintColor} size={25} />
                )
            }
        },

    },
    {
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'grey',
            showLabel: false,
            style: {
                height: 70,
                shadowColor: '#DEDDDD',
                shadowOpacity: 2,
                shadowOffset: {
                    height: 2,
                    width: 2
                },
                elevation: 3
                
            }

        }
    }

);

// creating switch navigation for screens without bottom navigation
const SwitchNavigation = createSwitchNavigator({ 
    Plant: Plant,
    MyPlant: MyPlant,
    LisaaKasvi: LisaaKasvi, 
    SelectName: SelectName,
    SelectPot: SelectPot
  })


// combining the 2 navigations into one app navigation
const AppNavigator = createSwitchNavigator({
    Main: BottomNavigator,
    Views: SwitchNavigation
})


const AppContainer = createAppContainer(AppNavigator);

export default function Navigation() {
    return (
        <AppContainer />
    )
}