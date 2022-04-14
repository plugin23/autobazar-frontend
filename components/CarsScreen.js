import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import CarItem from './CarItem'
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import { fetchAPI } from '../Api'

const Stack = createStackNavigator()

const CarsScreen = (props) => {

    const [cars, setCars] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [userId, setUserId] = useState(props.userId)

    useEffect(() => { 
        fetchCars()
    }, [])

    const fetchCars = () => {
        setIsFetching(true)

        
        fetchAPI('api/autobazar/cars', 'GET', {}).then(result => {
            setCars(result)
            setIsFetching(false)
        })
        
    }

    const renderItem = (item) => {
        //console.log(item.item)
        return (
            <CarItem car={item.item} />
        )
    }

    const itemSeparator = () => {
        return (
            <View style={styles.separator} />
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            {isFetching ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={cars}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item._id.toString()}
                    ItemSeparatorComponent={itemSeparator}
                    showsVerticalScrollIndicator={false}
                    refreshing={isFetching}
                    onRefresh={fetchCars}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    separator: {
        marginVertical: 8
    },
    loading: {
        paddingVertical: 50
    }
});

export default CarsScreen