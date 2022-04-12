import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import { fetchAPI } from '../Api'

const Stack = createStackNavigator()

class LoginScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            isLoading: false
        }

        this.handleUser = this.handleUser.bind(this)
        this.handlePass = this.handlePass.bind(this)
    }

    handleUser = (text) => {
        this.setState({ email: text })
    }

    handlePass = (pass) => {
        this.setState({ password: pass })
    }

    login = () => {
        if (this.state.email == "" || this.state.password == "") {
            Alert.alert("Prázdne pole", "Prosím vyplňte obe polia", [{ text: "OK", onPress: () => { } }])
            return
        }

        this.setState({
            isLoading: true
        })

        const bodyObject = {
            email: this.state.email,
            password: this.state.password
        }

        fetchAPI('api/autobazar/users/login', 'POST', bodyObject).then(result => {
            this.setState({
                isLoading: false
            })
            if (result.id) {
                //alert(result)
                this.props.loggedIn(result.id)
            }
            else { //ak uzivatel zada zle heslo alebo meno
                alert("Nesprávne údaje", "Údaje, ktoré ste zadali nie sú správne", [{ text: "OK", onPress: () => { } }])
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
                    <TouchableOpacity
                        onPress={this.login}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Prihlásiť sa</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={this.register}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Zaregistrovať sa</Text>
                    </TouchableOpacity>
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

export default LoginScreen