import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

// bottom navigation
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import AddPlant from './src/screens/addPlant/01-addPlant';
import Notifications from './src/screens/Notifications';


// switch navigation
import Plant from './src/screens/Plant';
import MyPlant from './src/screens/MyPlant';

// AddPlant
import SelectPlant from './src/screens/addPlant/01-addPlant';
import SelectPot from './src/screens/addPlant/02-selectPot';
import SelectName from './src/screens/addPlant/03-selectName';


// Settings
import Settings from './src/screens/settings/01-Settings';
import Info from './src/screens/settings/Info';
import Safety from './src/screens/settings/Safety';
import UserNotification from './src/screens/settings/UserNotification';
import Pots from './src/screens/settings/Pots';

//UserLogin
import Login from "./src/screens/UserLogin/Login"
import Logout from "./src/screens/UserLogin/Logout"


//creating bottom navigation
const BottomNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="ios-home" color={tintColor} size={25} />
                )
            }
        },

        Search: {
            screen: Search,
            navigationOptions: {
                tabBarLabel: 'Search',
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name="ios-search" color={tintColor} size={25} />
                )
            }
        },
        Add: {
            screen: AddPlant,
            navigationOptions: {
                tabBarLabel: 'AddPlant',
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
    Logout: Logout,
    Login: Login, 
    Plant: Plant,
    MyPlant: MyPlant,
    SelectPlant: SelectPlant, 
    SelectName: SelectName,
    SelectPot: SelectPot,
    Pots: Pots,
    Info: Info,
    Safety: Safety,
    UserNotification: UserNotification
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