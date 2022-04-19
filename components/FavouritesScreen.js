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
        const getCarsObject = async () => {
            setIsFetching(true)
    
            const userBookmarks = await fetch(`https://fiit-autobazar-backend.herokuapp.com/api/autobazar/users/${props.userId}` + '/favourites').then(response => response.json())
            setBookmarks(userBookmarks)

            
            let carObjects = []
            for (var i = 0; i < userBookmarks.length; i++) {
                let carId = userBookmarks[i]
                let carObj = await fetch(`https://fiit-autobazar-backend.herokuapp.com/api/autobazar/cars/${carId}`).then(response => response.json())
                
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