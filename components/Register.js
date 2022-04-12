import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import { fetchAPI } from '../API'

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            first_name: "",
            last_name: "",
            password: "",
            mail: "",
            phone_number: "",
            isLoading: false
        }

        this.handleUser = this.handleUser.bind(this)
        this.handleUserLast = this.handleUserLast.bind(this)
        this.handlePass = this.handlePass.bind(this)
        this.handleMail = this.handleMail.bind(this)
        this.handleTel = this.handleTel.bind(this)
    }

    handleUser = (text) => {
        this.setState({first_name: text})
    }
    handleUserLast = (text) => {
        this.setState({last_name: text})
    }

    handlePass = (pass) => {
        this.setState({password: pass})
    }

    handleMail = (text) => {
        this.setState({email: text})
    }

    handleTel = (text) => {
        this.setState({phone_number: text})
    }

    register = () => {
        if(this.state.first_name == "" || this.state.last_name == "" || this.state.password == "" || this.state.email == "" || this.state.phone_number == "") {
            alert("Prázdne pole", "Prosím vyplňte všetky polia", [{text:"OK", onPress: () => {}}])
            return
        }       

        this.setState({
            isLoading: true
        })

        const bodyObject = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            password: this.state.password,
            email: this.state.email,
            phone_number: this.state.phone_number
        }

        fetchAPI('api/autobazar/users', 'POST', bodyObject).then(result => {
            this.setState({
                isLoading: false
            })
            if(result.message == "User with this email already exists" || result.message == "Password already used") {
                alert("Užívateľ existuje", "Používateľ s týmto menom už existuje", [{text:"OK", onPress: () => {}}])
            }
            else { //ak je uspesna registracia
                alert("Úspešne zaregistrovaný", "Vaše konto bolo úspešne vytvorené, pokračujte prihlásením...")
                this.goBack()
            }
        })
    }

    goBack = () => {
        this.props.showRegister()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Autobazár</Text>
                <View style={styles.buttonMargin}>
                    <TextInput style={styles.inputText} placeholder="Meno" onChangeText={this.handleUser}/>
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Priezvisko" onChangeText={this.handleUserLast}/>
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Váš e-mail" onChangeText={this.handleMail}/>
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Telefónne číslo" onChangeText={this.handleTel}/>
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Heslo" onChangeText={this.handlePass} secureTextEntry={true}/>
                    <View style={styles.separator} />
                    <Button title="Registrovať" color="#2d6a4f" onPress={this.register}/>
                    <View style={styles.separator} />
                    <Button title="Naspäť" color="#081c15" onPress={this.goBack}/>
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
        marginBottom:50
    }
});

export default Register