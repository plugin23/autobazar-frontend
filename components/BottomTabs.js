import 'react-native-gesture-handler'
import React from 'react';
import CarsScreen from './CarsScreen'
import FavouritesScreen from './FavouritesScreen'
import AddCarScreen from './AddCarScreen'
import ProfileScreen from './ProfileScreen'
import { Ionicons } from '@expo/vector-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator();

const BottomTabs = (props) => {
    return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        let iconName
                        if (route.name === "Home") iconName = focused ? 'home' : 'home-outline';
                        else if (route.name === 'Bookmarks') iconName = focused ? 'star' : 'star-outline'
                        else if (route.name === 'Add') iconName = focused ? 'add-circle' : 'add-circle-outline'
                        else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline'
                        else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline'

                        return <Ionicons name={iconName} size={20} color={color} />;
                    }
                })
            }
            >
                <Tab.Screen name="Home" children={() => <CarsScreen userId={props.userId}/>} />
                <Tab.Screen name="Bookmarks" children={() => <FavouritesScreen userId={props.userId}/>}></Tab.Screen>
                <Tab.Screen name="Add" children={() => <AddCarScreen userId={props.userId}/>}></Tab.Screen>
                <Tab.Screen name="Search" children={() => <FavouritesScreen userId={props.userId}/>}></Tab.Screen>
                <Tab.Screen name="Profile" children={() => <ProfileScreen userId={props.userId} logOut={props.logOut} />}></Tab.Screen>
            </Tab.Navigator>
    );
}

export default BottomTabs