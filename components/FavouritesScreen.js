import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import { fetchAPI } from '../Api'

const Stack = createStackNavigator()

const FavouritesScreen = (props) => {
    const [isFetching, setIsFetching] = useState(true)
    const [cars, setCars] = useState([])

    useEffect(() => { 
        const fetchCars = () => {
            //isFetching = true -> fetchapi -> setCars
            setCars([])
        }
    }, [])
    
    return (
        <View style={styles.container}>
            <Text>Favouritessss</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    loading: {
        paddingVertical: 50
    }
});

export default FavouritesScreen