import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react';
import CarItem from './CarItem'
import CarScreen from './CarScreen';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { fetchAPI } from '../Api'

const Stack = createStackNavigator()

const FavouritesScreen = (props) => {
    const [isFetching, setIsFetching] = useState(true)
    const [bookmarks, setBookmarks] = useState([])
    const [bookmarkCars, setBookmarkCars] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => { 
        getCarsObject()
    }, [])

    useEffect(() => {
        setIsFetching(false)
    }, [bookmarkCars])

    const fetchBookmarksAndCarsAsync = async () => {
        setIsFetching(true)

        const bookmarkObj = await fetchAPI(`api/autobazar/users/${props.userId}`, 'GET', {})
        setBookmarks(bookmarkObj[0].favourites)

        let carObjects = []
        for (var i = 0; i < bookmarks.length; i++) {
            let carId = bookmarks[i]

            let carObj = await fetchAPI(`api/autobazar/cars/${carId}`, 'GET', {})

            if (!carObj.errors) {
                carObjects.push(carObj)
            }
        }

        return carObjects
    }

    const getCarsObject = async () => {
        let cars = await fetchBookmarksAndCarsAsync()
        setBookmarkCars(cars)
    }

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
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="bookmarkCars" options={{title: '', headerShown: false}} children={(props) =>
                <SafeAreaView style={styles.container}>
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
                            onRefresh={getCarsObject}
                        />
                )}
                </SafeAreaView>
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
        marginTop: 70,
        marginBottom: 50
    }
});


export default FavouritesScreen