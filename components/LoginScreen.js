import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import { fetchAPI } from '../Api'

const Stack = createStackNavigator()

class LoginScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mail: "",
            password: "",
            isLoading: false
        }

        this.handleUser = this.handleUser.bind(this)
        this.handlePass = this.handlePass.bind(this)
    }

    handleUser = (text) => {
        this.setState({ mail: text })
    }

    handlePass = (pass) => {
        this.setState({ password: pass })
    }

    login = () => {
        if (this.state.mail == "" || this.state.password == "") {
            Alert.alert("Prázdne pole", "Prosím vyplňte obe polia", [{ text: "OK", onPress: () => { } }])
            return
        }

        this.setState({
            isLoading: true
        })

        const bodyObject = {
            mail: this.state.mail,
            password: this.state.password
        }

        fetchAPI('api/autobazar/users/login', 'POST', bodyObject).then(result => {
            this.setState({
                isLoading: false
            })
            if (result.auth) {
                this.props.loggedIn(result.token, result.id)
            }
            else { //ak uzivatel zada zle heslo alebo meno
                Alert.alert("Nesprávne údaje", "Údaje, ktoré ste zadali nie sú správne", [{ text: "OK", onPress: () => { } }])
            }
        })
    }

    register = () => {
        this.props.showRegister()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Autobazár</Text>
                <View style={styles.buttonMargin}>
                    <TextInput style={styles.inputText} placeholder="Prihlasovacie meno" onChangeText={this.handleUser} />
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Heslo" onChangeText={this.handlePass} secureTextEntry={true} />
                    <View style={styles.separator} />
                    <Button title="Prihlásiť sa" color="#2d6a4f" onPress={this.login} />
                    <View style={styles.separator} />
                    <Button title="Zaregistrovať sa" color="#081c15" onPress={this.register} />
                </View>
                <View style={styles.separator} />
                <View style={styles.separator} />
                {this.state.isLoading && <ActivityIndicator size="large" color="#081c15" />}
                <StatusBar style="auto" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    separator: {
        marginVertical: 8
    },
    buttonMargin: {
        marginHorizontal: 20
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

export default LoginScreen