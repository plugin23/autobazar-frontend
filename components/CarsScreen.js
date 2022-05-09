import { createStackNavigator } from '@react-navigation/stack'
import CarItem from './CarItem'
import CarEdit from './CarEdit'
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CarScreen from './CarScreen';
import { useIsFocused } from '@react-navigation/native';

const Stack = createStackNavigator()

const CarsScreen = (props) => {

    const [cars, setCars] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const isFocused = useIsFocused();
    
    useEffect(() => { 
        fetchCars()
    }, [])

    useEffect(() => {
        isFocused && fetchCars()
    }, [isFocused])

    const fetchCars = () => {
        setIsFetching(true)
        let fetchObject = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }

        let carsWs = new WebSocket('ws://fiit-autobazar-backend.herokuapp.com/api/autobazar/cars')

        carsWs.onopen = () => {
            carsWs.send(JSON.stringify(fetchObject))
        }

        carsWs.onmessage = (e) => {
            let response = JSON.parse(e.data)
            setCars(response)
            setIsFetching(false) 
            carsWs.close()
        }
        
        /*fetch('https://fiit-autobazar-backend.herokuapp.com/api/autobazar/cars' ).then(response => response.json()).then(response => {
            setCars(response)
            setIsFetching(false)       
        }) */
        
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
                <Text style={styles.logo}>Všetky inzeráty</Text>
            </View>
        )  
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="allCars" options={{title: '', headerShown: false}} children={(props) =>
                <View style={styles.container}>
                    {isFetching ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <FlatList
                            data={cars}
                            renderItem={item => renderItem(item)}
                            keyExtractor={item => item._id.toString()}
                            ItemSeparatorComponent={itemSeparator}
                            ListHeaderComponent={renderHeader}
                            showsVerticalScrollIndicator={false}
                            refreshing={isFetching}
                            onRefresh={fetchCars}
                        />
                    )}
                </View>
            } />
            <Stack.Screen name="carScreen" options={{title: ''}} children={(props) =>
                <ScrollView>
                    <CarScreen {...props} />
                </ScrollView>
            } />

            <Stack.Screen name="carEdit" options={{title: ''}} children={(props) =>
                <CarEdit {...props}/>
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
    logo: {
        fontSize: 50,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20
    },
    loading: {
        paddingVertical: 50
    }
});

export default CarsScreen