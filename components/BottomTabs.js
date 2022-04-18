import 'react-native-gesture-handler'
import React from 'react';
import CarsScreen from './CarsScreen'
import FavouritesScreen from './FavouritesScreen'
import AddCarScreen from './AddCarScreen'
import ProfileScreen from './ProfileScreen'
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = (props) => {
    const navigation = useNavigation();
    return (
            <Tab.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Tab.Screen name="Home" 
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ focused, color }) => {
                            let iconName = focused ? 'home' : 'home-outline';
                            return <Ionicons name={iconName} size={20} color={color} />;
                        }
                    }}
                    children={() => <CarsScreen userId={props.userId} />} />
                <Tab.Screen name="Bookmarks" 
                    options={{
                        tabBarLabel: 'Bookmarks',
                        tabBarIcon: ({ focused, color }) => {
                            let iconName = focused ? 'bookmark' : 'bookmark-outline';
                            return <Ionicons name={iconName} size={20} color={color} />;
                        }
                    }}
                    children={() => <FavouritesScreen userId={props.userId}/>}></Tab.Screen>
                <Tab.Screen name="Add" 
                    options={{
                        tabBarLabel: 'Add',
                        tabBarIcon: ({ focused, color }) => {
                            let iconName = focused ? 'add-circle' : 'add-circle-outline';
                            return <Ionicons name={iconName} size={20} color={color} />;
                        }
                    }}
                    children={() => <AddCarScreen userId={props.userId}/>}></Tab.Screen>
                <Tab.Screen name="Search" 
                    options={{
                        tabBarLabel: 'Search',
                        tabBarIcon: ({ focused, color }) => {
                            let iconName = focused ? 'search' : 'search-outline';
                            return <Ionicons name={iconName} size={20} color={color} />;
                        }
                    }}
                    children={() => <FavouritesScreen userId={props.userId}/>}></Tab.Screen>
                <Tab.Screen name="Profile" 
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ focused, color }) => {
                            let iconName = focused ? 'person' : 'person-outline';
                            return <Ionicons name={iconName} size={20} color={color} />;
                        }
                    }}
                    children={() => <ProfileScreen userId={props.userId} logOut={props.logOut}/>}></Tab.Screen>
            </Tab.Navigator>
    );
}

export default BottomTabs