import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import { fetchAPI } from '../Api'

const Stack = createStackNavigator()

const CarsScreen = (props) => {

    const [cars, setCars] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [userId, setUserId] = useState(props.userId)

    useEffect(() => { 
        const fetchCars = () => {
            //isFetching = true -> fetchapi -> setCars
            setCars([])
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text>Home</Text>
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

export default CarsScreen