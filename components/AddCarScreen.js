<<<<<<< Updated upstream
=======
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Children } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchAPI } from '../Api'
import * as ImagePicker from "expo-image-picker";
import { storage } from './firebase';
import fs from 'fs'
import fetch from 'node-fetch'



const firebaseConfig = {
    apiKey: "AIzaSyC3bvlOlY1gGFWUiSDMg9YA94E8hwGSwuo",
    authDomain: "mtaa-autobazar-storage.firebaseapp.com",
    projectId: "mtaa-autobazar-storage",
    storageBucket: "mtaa-autobazar-storage.appspot.com",
    messagingSenderId: "276629828442",
    appId: "1:276629828442:web:876afc5961294466e47963",
    measurementId: "G-XL77BC1PLX"
  };
  
  // Initialize Firebase
  //initializeApp(firebaseConfig);


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
    const [car_model, setcar_model] = useState("") 
    const [isAdded, setIsAdded] = useState(false)
    const [image, setImage] = useState(false)
    const [url, setUrl] = useState("")


    useEffect(() => { 
        const fetchCars = () => {
            //isFetching = true -> fetchapi -> setCars
            setCars([])
        }
    }, [])


    const addCar = () => {
        if (carBrand == "" || engineCap == "" || year=="" || mileage=="" || price=="" || doors=="" || description=="" || body=="" || car_model=="") {
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
            body: body,
            car_model : car_model
            
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
    
    const handleChange = e  => {
        if(e.target.files[0]){
            console.log(e.target.files[0])
            setImage(e.target.files[0])
        }
    };

    const handleUpdate = () => {
        const uploadTask = storage.ref(`images/$image.name`).put(image);
        console.log(uploadTask)
            uploadTask.on(
                "status_changed",
                snapshot => {},
                () => {
                    storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log('som tuaaaa')
                        console.log(url);
                        setUrl(url);
                    });
                }
            )
            console.log(uploadTask)    
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
                <TextInput style={styles.inputText} placeholder="Model" onChangeText={(text) => setcar_model(text)} />
                <View style={styles.separator} />
                <TextInput style={styles.inputText} placeholder="Výkon" onChangeText={(text) => setEngineCap(text)} />
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
                <View style={{ paddingVertical: 10 }} />
                <>
                <input type="file" onChange={handleChange} />
                <button onClick={handleUpdate}>Upload</button>
                </>
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
>>>>>>> Stashed changes
