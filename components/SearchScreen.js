import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react';
import CarItem from './CarItem'
import CarScreen from './CarScreen';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { fetchAPI } from '../Api'
import { TextInput } from 'react-native-gesture-handler';

const SearchScreen = (props) => {
    const [isFetching, setIsFetching] = useState(false)
    const [searchDone, setSearchDone] = useState(false)
    const [cars, setCars] = useState([])
    const [search, setSearch] = useState("")

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
            <Stack.Screen name="search" options={{title: '', headerShown: false}} children={(props) =>
                <SafeAreaView style={styles.container}>
                    <TextInput></TextInput>
                    {isFetching ? (
                        <ActivityIndicator size="large" />
                        ) : 
                        searchDone ? (
                            <FlatList
                                data={bookmarkCars}
                                renderItem={item => renderItem(item)}
                                keyExtractor={item => item._id.toString()}
                                ItemSeparatorComponent={itemSeparator}
                                showsVerticalScrollIndicator={false}
                                refreshing={isFetching}
                                onRefresh={getCarsObject}
                            />
                        ) : <></>
                    }
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

export default SearchScreen
