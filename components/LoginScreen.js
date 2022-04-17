import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import { fetchAPI } from '../Api'

const Stack = createStackNavigator()

const LoginScreen = (props) => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
 
    const login = () => {
        if (email == "" || password == "") {
            Alert.alert("Prázdne pole", "Prosím vyplňte obe polia", [{ text: "OK", onPress: () => { } }])
            return
        }

        setIsLoading(true)

        const bodyObject = {
            email: email,
            password: password
        }

        fetchAPI('api/autobazar/users/login', 'POST', bodyObject).then(result => {
            setIsLoading(false)

            if (result.id) {
                //alert(result)
                props.loggedIn(result.id)
            }
            else { //ak uzivatel zada zle heslo alebo meno
                Alert.alert("Nesprávne údaje", "Údaje, ktoré ste zadali nie sú správne", [{ text: "OK", onPress: () => { } }])
            }
        })
    }
    
    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
            <Text style={styles.logo}>Autobazár</Text>
            <View style={styles.buttonMargin}>
                <TextInput style={styles.inputText} placeholder="Prihlasovacie meno" onChangeText={(text) => setEmail(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Heslo" onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
                <View style={styles.separator} />
                <TouchableOpacity
                    onPress={login}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Prihlásiť sa</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                    onPress={() => props.showRegister()}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Zaregistrovať sa</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View style={styles.separator} />
            {isLoading && <ActivityIndicator size="large" color="#081c15" />}
            <StatusBar style="auto" />
        </KeyboardAwareScrollView>
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
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        height: 50
    },
    logo: {
        fontSize: 50,
        textAlign: "center",
        marginBottom: 50
    }
});

export default LoginScreen