import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchAPI } from '../Api'

const Stack = createStackNavigator()

const AddCarScreen = (props) => {
    const [carBrand, setCarBrand] = useState("")
    const [engineCap, setEngineCap] = useState("")
    const [year, setYear] = useState(0)
    const [mileage, setMileage] = useState(0)
    const [price, setPrice] = useState(0)
    const [doors, seDdoors] = useState(0)
    const [description, setdescription] = useState("")
    const [body, setBody] = useState("") 
    const [isAdded, setIsAdded] = useState(false)


    useEffect(() => { 
        const fetchCars = () => {
            //isFetching = true -> fetchapi -> setCars
            setCars([])
        }
    }, [])


    const addCar = () => {
        if (carBrand == "" || engineCap == "" || year=="" || mileage=="" || price=="" || doors=="" || description=="" || body=="") {
            Alert.alert("Prázdne pole", "Prosím vyplňte obe polia", [{ text: "OK", onPress: () => { } }])
            return
        }

        const bodyObject = {
            author: props.userId,
            year: year,
            mileage: mileage,
            price: price,
            doors: doors,
            description: description,
            engine_cap: engineCap,
            car_brand: carBrand,
            body: body
            
        }

        fetchAPI('api/autobazar/cars', 'POST', bodyObject).then(result => {
            
            if (result._id) {
                setIsAdded(true)
            }
            else { //ak uzivatel zada zle heslo alebo meno
                Alert.alert("Nesprávne údaje", "Údaje, ktoré ste zadali nie sú správne", [{ text: "OK", onPress: () => { } }])
            }
        })
    }
    
    return (
        isAdded ? (
            <h1>uspešne pridaný inzerát</h1>
        )
        :        
        (<View style={styles.container}>
            <h1>Pridať inzerát</h1>
            <ScrollView style={styles.buttonMargin}>
                <TextInput style={styles.inputText} placeholder="Značka" onChangeText={(text) => setCarBrand(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Model" onChangeText={(text) => setEngineCap(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Rok výroby" onChangeText={(text) => setYear(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Počet  najazdenýchkilometrov" onChangeText={(text) => setMileage(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Počet dverí" onChangeText={(text) => seDdoors(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Karoséria" onChangeText={(text) => setBody(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Cena" onChangeText={(text) => setPrice(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Popis" onChangeText={(text) => setdescription(text)} />
                <View style={styles.separator} />
                <TouchableOpacity
                    onPress={addCar}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Pridať inzerát</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
            </ScrollView>
            <View style={styles.separator} />
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

export default AddCarScreen