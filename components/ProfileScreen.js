import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { fetchAPI } from '../Api'
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import UserItem from './UserItem';
import FavouriteItem from './FavouriteItem'


const Stack = createStackNavigator()

const ProfileScreen = (props) => {

    const [isFetching, setIsFetching] = useState(true)
    const [cars, setCars] = useState([])


    useEffect(() => { 
        fetchCars()
    }, [])   

    const fetchCars = () => {
        setIsFetching(true)
        
        fetchAPI('api/autobazar/users/'+ props.userId, 'GET').then(result => {    

            if (result[0]._id) {
                setCars(result)
                setIsFetching(false)
            }
            else { 
                alert("Nepodarilo sa naloadovať dáta!", [{ text: "OK", onPress: () => { } }])
            }
        })
    }

    const renderItem = (item) => {
        return (
            <UserItem car={item.item} logOut={props.logOut} />
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

export default ProfileScreen