import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
export fetchAPI, { fetchAPI } from '../Api'
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import UserItem from './UserItem';
import FavouriteItem from './FavouriteItem'
import CarItem from './CarItem'

const Stack = createStackNavigator()

const ProfileScreen = (props) => {

    const [isFetching, setIsFetching] = useState(true)
<<<<<<< Updated upstream
    const [cars, setCars] = useState([])

=======
    const [isFetchingUser, setIsFetchingUser] = useState(true)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [ownedCars, setOwnedCars] = useState([])
    useEffect(() => { 
        const getCarsObject = async () => {
            
            const userObj = await fetchAPI(`api/autobazar/users/${props.userId}`, 'GET', {})
            setFirstName(userObj[0].first_name)
            setLastName(userObj[0].last_name)
            setPhoneNumber(userObj[0].phone_number)
            setEmail(userObj[0].email)
            setOwnedCars(userObj[0].own_advertisements)
>>>>>>> Stashed changes

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
        console.log(item.item)
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