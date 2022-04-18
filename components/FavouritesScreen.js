import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react';
import CarItem from './CarItem'
import CarScreen from './CarScreen';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import fetchAPI from '../Api'

const Stack = createStackNavigator()

const FavouritesScreen = (props) => {
    const [isFetching, setIsFetching] = useState(true)
    const [bookmarks, setBookmarks] = useState([])
    const [bookmarkCars, setBookmarkCars] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => { 
        const getCarsObject = async () => {
            setIsFetching(true)
    
            const userObj = await fetchAPI(`api/autobazar/users/${props.userId}`, 'GET', {})
            setBookmarks(userObj[0].favourites)

            
            let carObjects = []
            for (var i = 0; i < userObj[0].favourites.length; i++) {
                let carId = userObj[0].favourites[i]
                let carObj = await fetchAPI(`api/autobazar/cars/${carId}`, 'GET', {})
                
                if (!carObj.errors) {
                    carObjects.push(carObj)
                }
            }
            
            setBookmarkCars(carObjects)
        }

        getCarsObject().then(() => {
            setIsFetching(false)
        })
        
    }, [])

    useEffect(() => { 
        const getCarsObject = async () => {
            setIsFetching(true)
    
            const userObj = await fetchAPI(`api/autobazar/users/${props.userId}`, 'GET', {})
            setBookmarks(userObj[0].favourites)

            
            let carObjects = []
            for (var i = 0; i < userObj[0].favourites.length; i++) {
                let carId = userObj[0].favourites[i]
                console.log(userObj[0].favourites[i])
                let carObj = await fetchAPI(`api/autobazar/cars/${carId}`, 'GET', {})
                
                if (!carObj.errors) {
                    carObjects.push(carObj)
                }
            }
            
            setBookmarkCars(carObjects)
        }

        isFetching && getCarsObject().then(() => {
            setIsFetching(false)
        })
        
    }, [isFetching])

    const renderItem = (item) => {
        //console.log("id: " + props.userId)
        return (
            <CarItem car={item.item} userId={props.userId}/>
        )
    }

    const itemSeparator = () => {
        return (
            <View style={styles.separator} />
        )
    }

    const onRefresh = () => {
        setIsFetching(true)
    }
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="bookmarkCars" options={{title: '', headerShown: false}} children={(props) =>
                <View style={styles.container}>
                    <Text style={styles.logo}>Uložené inzeráty</Text>
                    {isFetching ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <FlatList
                            data={bookmarkCars}
                            renderItem={item => renderItem(item)}
                            keyExtractor={item => item._id.toString()}
                            ItemSeparatorComponent={itemSeparator}
                            showsVerticalScrollIndicator={false}
                            refreshing={isFetching}
                            onRefresh={onRefresh}
                        />
                    )}
                </View>
                
            } />
            <Stack.Screen name="carScreen" options={{title: ''}} children={(props) =>
                <ScrollView>
                    <CarScreen {...props} />
                </ScrollView>
            } />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    separator: {
        marginVertical: 8
    },
    loading: {
        paddingVertical: 50
    },    
    logo: {
        fontSize: 50,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20
    }
});


export default FavouritesScreen