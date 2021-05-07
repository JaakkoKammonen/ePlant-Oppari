import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

// bottom navigation
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Notifications from './src/screens/Notifications';


// switch navigation
import Plant from './src/screens/Plant';
import MyPlant from './src/screens/MyPlant';

// AddPlant
import PlantOrPot from "./src/screens/Plants/01-plantOrpot"
//Addplant
import SelectPlant from './src/screens/Plants/addPlant/01-selectPlant';
import SelectPot from './src/screens/Plants/addPlant/02-selectPot';
import SelectName from './src/screens/Plants/addPlant/03-selectName';
//AddPot
import AddNewPot from "./src/screens/Plants/addPot/addNewPot"

// Settings
import Settings from './src/screens/settings/01-Settings';
import Info from './src/screens/settings/Info';
import Safety from './src/screens/settings/Safety';
import UserNotification from './src/screens/settings/UserNotification';
import Pots from './src/screens/settings/Pots';

//UserLogin
import Login from "./src/screens/UserLogin/Login"
import Logout from "./src/screens/UserLogin/Logout"
import Signup from "./src/screens/UserLogin/Signup"

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
            screen: PlantOrPot,
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
    Signup: Signup, 

    Plant: Plant,
    MyPlant: MyPlant,
    

    SelectPlant: SelectPlant, 
    SelectName: SelectName,
    SelectPot: SelectPot,

    AddNewPot: AddNewPot,
    
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