import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react';
import CarItem from './CarItem'
import CarScreen from './CarScreen';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';


const Stack = createStackNavigator()

const FavouritesScreen = (props) => {
    const [isFetching, setIsFetching] = useState(true)
    const [bookmarks, setBookmarks] = useState([])
    const [bookmarkCars, setBookmarkCars] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => { 
        isFocused && getCarsObject()
    }, [isFocused])

    useEffect(() => {
        //console.log(bookmarkCars.length)
        if (bookmarkCars.length) {
            //console.log("fetch false")
            setIsFetching(false)
        }
    }, [bookmarkCars])

    const waitForSocketConnection = (socket, callback) => {
        setTimeout(
            function () {
                if (socket.readyState === 1) {
                    if (callback != null){
                        callback();
                    }
                } else {
                    waitForSocketConnection(socket, callback);
                }
    
            }, 5); // wait 5 milisecond for the connection...
    }

    const getCarsObject = async () => {
        setIsFetching(true)

        let fetchObject = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }

        let usersWs = new WebSocket(`ws://fiit-autobazar-backend.herokuapp.com/api/autobazar/users/${props.userId}` + '/favourites')

        let carObjects = []
        let carSockets = []
        let response;

        usersWs.onopen = () => {
            waitForSocketConnection(usersWs, function () {
                console.log("favourites user message sent!!!");
                usersWs.send(JSON.stringify(fetchObject))
            });

            usersWs.onmessage = async (e) => {

                response = JSON.parse(e.data)
                //console.log(response)
                setBookmarks(response)
                //userObj = response   

                for (var i = 0; i < response.length; i++) {

                    let carId = response[i]
                    carSockets[i] = new WebSocket(`ws://fiit-autobazar-backend.herokuapp.com/api/autobazar/cars/${carId}`)

                    //let carWs = new WebSocket(`ws://fiit-autobazar-backend.herokuapp.com/api/autobazar/cars/${carId}`)
                    //let carObj;
                    let carWs = await carSockets[i]
                    carWs.onopen = () => {
                        waitForSocketConnection(carWs, function () {
                            console.log("profile cars req send!!!");
                            carWs.send(JSON.stringify(fetchObject))
                        });
                    }

                    carWs.onmessage = (e) => {
                        const carResponse = JSON.parse(e.data)

                        //carObj = response
                        console.log(carResponse)
                        if (!carResponse.errors) {
                            carObjects.push(carResponse)
                        }

                        if (carObjects.length == response.length) {
                            setBookmarkCars(carObjects)
                            usersWs.close()
                        }

                        carWs.close()
                    }

                }

            }
        }

        //const userBookmarks = await fetch(`https://fiit-autobazar-backend.herokuapp.com/api/autobazar/users/${props.userId}` + '/favourites').then(response => response.json())
        //setBookmarks(userBookmarks)

    }

    const renderItem = (item) => {
        return (
            <CarItem car={item.item} userId={props.userId}/>
        )
    }

    const itemSeparator = () => {
        return (
            <View style={styles.separator} />
        )
    }

    const renderHeader = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Uložené inzeráty</Text>
            </View>
        )  
    }

    const onRefresh = () => {
        setIsFetching(true)
    }
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="bookmarkCars" options={{title: '', headerShown: false}} children={(props) =>
                <View style={styles.container}>
                    {isFetching ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <FlatList
                            data={bookmarkCars}
                            renderItem={item => renderItem(item)}
                            keyExtractor={item => item._id.toString()}
                            ListHeaderComponent={renderHeader}
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
        fontSize: 45,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20
    }
});


export default FavouritesScreen