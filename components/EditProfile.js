import React from 'react'
import { View, TextInput, StyleSheet, Button } from 'react-native'
import { fetchAPI } from '../API'

class EditProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tel: props.user.tel,
            mail: props.user.mail,
        }
    }

    handleTel = (text) => {
        this.setState({
            tel: text
        })
    }

    handleMail = (text) => {
        this.setState({
            mail: text
        })
    }

    saveProfile = () => {
        fetchAPI(`api/v1/users/${this.props.user._id}`, 'PUT', {tel: this.state.tel, mail: this.state.mail}, this.props.token).then(result => {
            this.props.fetchUser()
            this.props.navigation.navigate("Profile")
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputText} placeholder="Telefónne číslo" value={this.state.tel} onChangeText={this.handleTel} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="E-mail" value={this.state.mail} onChangeText={this.handleMail} />
                <View style={styles.separator} />
                <Button title="Uložiť údaje" color="#2d6a4f" onPress={this.saveProfile} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputText: {
        borderColor: "#b7e4c7",
        borderWidth: 1,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    separator: {
        marginVertical: 8
    },
    container: {
        paddingHorizontal: 15,
        paddingVertical: 15
    }
})

export default EditProfile