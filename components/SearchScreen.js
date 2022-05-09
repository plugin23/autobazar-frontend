import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react';
import CarItem from './CarItem'
import CarScreen from './CarScreen';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Stack = createStackNavigator()

const SearchScreen = (props) => {
    const [isFetching, setIsFetching] = useState(false)
    const [searchDone, setSearchDone] = useState(false)
    const [cars, setCars] = useState([])
    const [search, setSearch] = useState("")

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
            <View style={styles.searchContainer}>
                <TextInput style={styles.inputText} placeholder='Názov vozidla napr. VW Passat' onChangeText={(text) => setSearch(text)}></TextInput>
                <View style={styles.separator} />
                <TouchableOpacity
                    onPress={searchCars}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Hľadať</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const searchCars = () => {
        if (search != "") {
            setIsFetching(true)

            let fetchObject = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            }

            let carsWs = new WebSocket(`ws://fiit-autobazar-backend.herokuapp.com/api/autobazar/cars/search/${search}`)

            carsWs.onopen = () => {
                carsWs.send(JSON.stringify(fetchObject))
            }

            carsWs.onmessage = (e) => {
                let response = JSON.parse(e.data)
                setCars(response)
                setIsFetching(false)
                setSearchDone(true)   
            }
            
            /*fetch(`https://fiit-autobazar-backend.herokuapp.com/api/autobazar/cars/search/${search}`).then(response => response.json()).then(response => {
                setCars(response)
                setIsFetching(false)
                setSearchDone(true)          
            }) */   
        }
    }
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="search" options={{title: '', headerShown: false}} children={(props) =>
                <View style={styles.container}>
                    <View style={styles.searchContainer}>
                        <TextInput style={styles.inputText} placeholder='Názov vozidla napr. VW Passat' onChangeText={(text) => setSearch(text)}></TextInput>
                        <View style={styles.separator} />
                        <TouchableOpacity
                            onPress={searchCars}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Hľadať</Text>
                        </TouchableOpacity>
                    </View>
                    {isFetching ? (
                        <ActivityIndicator size="large" />
                        ) :
                        searchDone ? (
                            <FlatList
                                data={cars}
                                renderItem={item => renderItem(item)}
                                keyExtractor={item => item._id.toString()}
                                ItemSeparatorComponent={itemSeparator}
                                showsVerticalScrollIndicator={false}
                            /> 
                        ) : <></>
                    }
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
    searchContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    separator: {
        marginVertical: 8
    },
    loading: {
        paddingVertical: 50
    },    
    inputText: {
        borderColor: "#000",
        width: 300,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        height: 40
    },
    buttonStyle: {
        width: 300,
        height: 50,
        alignItems: 'center',
        padding: 15,
        borderRadius: 100,
        backgroundColor: 'black'
    },
    buttonText: {
        fontSize: 15,
        color: '#fff'
    },
    logo: {
        fontSize: 50,
        textAlign: "center",
        marginTop: 70,
        marginBottom: 50
    }
});

export default SearchScreen
