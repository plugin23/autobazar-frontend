import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchAPI } from '../Api'

const Stack = createStackNavigator()

const ProfileScreen = (props) => {

    const [isLoaded, setIsLoaded] = useState(false)    

    fetchAPI('api/autobazar/users/'+ props.userId, 'GET').then(result => {    
        
        if (result._id) {
            console.log('naloadovane data')
            setIsLoaded(true)
        }
        else { 
        Alert.alert("Nepodarilo sa naloadovať dáta!", [{ text: "OK", onPress: () => { } }])
        }
    })
    
    
    return (       
        isLoaded ?  (
        <h1>Nepodarilo sa naloadovať</h1>)
        :
        (            
        <View style={styles.container}>
            <h1>Profil</h1>
            <p> niečo</p>
        </View>
        ) 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        marginVertical: 8
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
    inputText: {
        borderColor: "#b7e4c7",
        borderWidth: 1,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    logo: {
        fontSize: 50,
        textAlign: "center",
        marginBottom: 50
    }
});

export default ProfileScreen