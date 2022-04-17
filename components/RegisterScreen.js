import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { fetchAPI } from '../Api'

const RegisterScreen = (props) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const register = () => {
        if(firstName == "" || lastName == "" || password == "" || email == "" || phoneNumber == "") {
            Alert.alert("Prázdne pole", "Prosím vyplňte všetky polia", [{text:"OK", onPress: () => {}}])
            return
        }       

        setIsLoading(true)

        const bodyObject = {
            first_name: firstName,
            last_name: lastName,
            password: password,
            email: email,
            phone_number: phoneNumber
        }

        fetchAPI('api/autobazar/users', 'POST', bodyObject).then(result => {
            setIsLoading(false)
            if(result.message == "User with this email already exists" || result.message == "Password already used") {
                Alert.alert("Užívateľ existuje", "Používateľ s týmto menom už existuje", [{text:"OK", onPress: () => {}}])
            }
            else { //ak je uspesna registracia
                Alert.alert("Úspešne zaregistrovaný", "Vaše konto bolo úspešne vytvorené, pokračujte prihlásením...")
                props.showRegister()
            }
        })
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
            <Text style={styles.logo}>Registrácia</Text>
            <View style={styles.buttonMargin}>
                <TextInput style={styles.inputText} placeholder="Meno" onChangeText={(text) => setFirstName(text)}/>
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Priezvisko" onChangeText={(text) => setLastName(text)}/>
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Váš e-mail" onChangeText={(text) => setEmail(text)}/>
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Telefónne číslo" onChangeText={(text) => setPhoneNumber(text)}/>
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Heslo" onChangeText={(text) => setPassword(text)} secureTextEntry={true}/>
                <View style={styles.separator} />
                <TouchableOpacity
                        onPress={register}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Registrovať</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                        onPress={props.showRegister}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Naspäť</Text>
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
    buttonMargin: {
        marginHorizontal: 20
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
        marginTop: 50,
        marginBottom:50
    }
});

export default RegisterScreen