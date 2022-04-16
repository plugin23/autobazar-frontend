import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchAPI } from '../Api'
import { useNavigation } from '@react-navigation/native';

const CarEdit = (props) => {
    
    console.log(props)
    const [userId, setUserId] = useState(props.route.params.userId)
    const [car, setCar] = useState(props.route.params.car)
    const [engineCap, setEngineCap] = useState(props.route.params.engine_cap)
    const [year, setYear] = useState(props.route.params.year)
    const [mileage, setMileage] = useState(props.route.params.mileage)
    const [doors, setDoors] = useState(props.route.params.doors)
    const [body, setBody] = useState(props.route.params.body)
    const [price, setPrice] = useState(props.route.params.price)
    const [description, setDescription] = useState(props.route.params.description)
    const navigation = useNavigation()

    const editCar = () => {
        if (engineCap == "" || year == "" || mileage == "" || price == "" || doors == "" || description == "" || body == "") {
            Alert.alert("Prosím vyplňte všetky polia", [{ text: "OK", onPress: () => { } }])
            return
        }

        const bodyObject = {
            author: userId,
            year: year,
            mileage: mileage,
            price: price,
            doors: doors,
            description: description,
            engine_cap: engineCap,
            body: body
        }

        fetchAPI(`api/autobazar/cars/${car._id}`, 'PUT', bodyObject).then(result => {
            navigation.goBack()
        })
    }

    return (
        <ScrollView style={styles.buttonMargin}>
                <TextInput style={styles.inputText} placeholder="Výkon" value={engineCap} onChangeText={(text) => setEngineCap(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Rok výroby" value={year} onChangeText={(text) => setYear(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Počet najazdených kilometrov" value={mileage} onChangeText={(text) => setMileage(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Počet dverí" value={doors} onChangeText={(text) => setDoors(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Karoséria" value={body} onChangeText={(text) => setBody(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Cena" value={price} onChangeText={(text) => setPrice(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Popis" value={description} onChangeText={(text) => setDescription(text)} />
                <View style={styles.separator} />
                <TouchableOpacity
                    onPress={editCar}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Upraviť inzerát</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
        </ScrollView>
    )
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

export default CarEdit