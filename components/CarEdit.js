import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';

const CarEdit = (props) => {
        
    const [car, setCar] = useState(props.route.params.car)
    const [engineCap, setEngineCap] = useState(props.route.params.car.engine_cap)
    const [year, setYear] = useState(props.route.params.car.year.toString())
    const [mileage, setMileage] = useState(props.route.params.car.mileage.toString())
    const [doors, setDoors] = useState(props.route.params.car.doors.toString())
    const [body, setBody] = useState(props.route.params.car.body)
    const [price, setPrice] = useState(props.route.params.car.price.toString())
    const [description, setDescription] = useState(props.route.params.car.description)
    const navigation = useNavigation()

    const editCar = () => {
        if (engineCap == "" || year == "" || mileage == "" || price == "" || doors == "" || description == "" || body == "") {
            Alert.alert("Prosím vyplňte všetky polia", [{ text: "OK", onPress: () => { } }])
            return
        }

        const bodyObject = {
            year: year,
            mileage: mileage,
            price: price,
            doors: doors,
            description: description,
            engine_cap: engineCap,
            body: body
        }      

        const fetchObject = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: bodyObject
        }

<<<<<<< HEAD
        let carsWs = new WebSocket(`ws://fiit-autobazar-backend.herokuapp.com/api/autobazar/cars/${car._id}`)

        carsWs.onopen = () => {
            carsWs.send(JSON.stringify(fetchObject))
        }

        carsWs.onmessage = (e) => {
            Alert.alert("Inzerát bol úspešne upravený")
            navigation.goBack()   
            carsWs.close()
        }
        
        /*fetch(`https://fiit-autobazar-backend.herokuapp.com/api/autobazar/cars/${car._id}`, fetchObject).then(response => response.json()).then(response => {
=======
        fetch(`https://fiit-autobazar-backend.herokuapp.com/api/autobazar/cars/${car._id}` , fetchObject).then(response => response.json()).then(response => {
>>>>>>> 3dfe0e65eaa104550e0a796b8b11cfc0af352c03
            navigation.goBack()          
        })*/      
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Výkon motora" value={engineCap} onChangeText={(text) => setEngineCap(text)} />
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
        </KeyboardAwareScrollView>
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
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        width: '80%',
        height: 50
    },
    logo: {
        fontSize: 50,
        textAlign: "center",
        marginBottom: 50
    }
});

export default CarEdit