<<<<<<< HEAD
<<<<<<< Updated upstream
=======
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Children } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchAPI } from '../Api'
<<<<<<< HEAD
=======
import * as ImagePicker from "expo-image-picker";
import { storage } from './firebase';
import fs from 'fs'
import fetch from 'node-fetch'


=======
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { fetchAPI } from '../Api'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import firebase from "firebase/app";
import "firebase/storage";
>>>>>>> 826eeddb59b9f88daaa4dcb351577ec3bcf7bb51

const firebaseConfig = {
    apiKey: "AIzaSyC3bvlOlY1gGFWUiSDMg9YA94E8hwGSwuo",
    authDomain: "mtaa-autobazar-storage.firebaseapp.com",
    projectId: "mtaa-autobazar-storage",
    storageBucket: "mtaa-autobazar-storage.appspot.com",
    messagingSenderId: "276629828442",
    appId: "1:276629828442:web:876afc5961294466e47963",
    measurementId: "G-XL77BC1PLX"
<<<<<<< HEAD
  };
  
  // Initialize Firebase
  //initializeApp(firebaseConfig);

=======
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
>>>>>>> 826eeddb59b9f88daaa4dcb351577ec3bcf7bb51
>>>>>>> frontend-work-jv

const Stack = createStackNavigator()

const AddCarScreen = (props) => {
<<<<<<< HEAD
=======

>>>>>>> 826eeddb59b9f88daaa4dcb351577ec3bcf7bb51
    const [carBrand, setCarBrand] = useState("")
    const [engineCap, setEngineCap] = useState("")
    const [year, setYear] = useState(0)
    const [mileage, setMileage] = useState(0)
    const [price, setPrice] = useState(0)
<<<<<<< HEAD
    const [doors, seDdoors] = useState(0)
    const [description, setdescription] = useState("")
    const [body, setBody] = useState("") 
    const [car_name, setCar_name] = useState("") 
    const [car_model, setcar_model] = useState("") 
    const [isAdded, setIsAdded] = useState(false)
    const [car_id, setCarId] = useState("")


    useEffect(() => { 
        const fetchCars = () => {
            //isFetching = true -> fetchapi -> setCars
            setCars([])
        }
    }, [])


    const addCar = () => {
        if (carBrand == "" || engineCap == "" || year=="" || mileage=="" || price=="" || doors=="" || description=="" || body=="" || car_model=="" || car_name=="") {
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
            car_name: car_name,
            car_model : car_model
            
        }

        fetchAPI('api/autobazar/cars', 'POST', bodyObject).then(result => {
            
            if (result._id) {
                setIsAdded(true)
                setCarId(result._id)
                edit_user(result)
                
            }
            else { //ak uzivatel zada zle heslo alebo meno
                Alert.alert("Nesprávne údaje", "Údaje, ktoré ste zadali nie sú správne", [{ text: "OK", onPress: () => { } }])
            }
        })       
    
    }

   

    const edit_user = (result) => {
        console.log(result._id)

        const bodyObjectUser = {
            own_advertisement: result._id 
        }
<<<<<<< HEAD
        
        console.log(bodyObjectUser)

        fetchAPI(`api/autobazar/users/${result.author}/own_advertisement`, 'PUT', bodyObjectUser).then(result => {

            if (result) {
                alert('pridane aj userovi')                
            }
            else { //ak uzivatel zada zle heslo alebo meno
                Alert.alert("Nepodarilo sa vložiť užívateľovi tento inzerát", "Údaje, ktoré ste zadali nie sú správne", [{ text: "OK", onPress: () => { } }])
            }
        })
=======
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
>>>>>>> frontend-work-jv
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
                <TextInput style={styles.inputText} placeholder="Car name" onChangeText={(text) => setCar_name(text)} />
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
=======
    const [doors, setDoors] = useState(0)
    const [description, setDescription] = useState("")
    const [body, setBody] = useState("")
    const [carModel, setCarModel] = useState("")
    const [isAdded, setIsAdded] = useState(false)
    const [image, setImage] = useState(false)
    const [url, setUrl] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)


    useEffect(() => {
        if (url != "" && url != null) {
            let carNameString = carBrand + " " + carModel;
            const bodyObject = {
                author: props.userId,
                year: year,
                mileage: mileage,
                price: price,
                doors: doors,
                description: description,
                engine_cap: engineCap,
                car_name: carNameString,
                body: body,
                image_photos: [url]
            }

            fetchAPI('api/autobazar/cars', 'POST', bodyObject).then(result => {

                if (result._id) {
                    setIsAdded(true)
                }
                else {
                    Alert.alert("Údaje, ktoré ste zadali nie sú správne", [{ text: "OK", onPress: () => { } }])
                }
            });
        }
    }, [url])

    const addCar = async () => {
        if (carBrand == "" || engineCap == "" || year == "" || mileage == "" || price == "" || doors == "" || description == "" || body == "" || carModel == "") {
            Alert.alert("Prosím vyplňte všetky polia", [{ text: "OK", onPress: () => { } }])
            return
        }

        let url = await uploadImageAsync(selectedImage)
        setUrl(url)
    }

    //https://docs.expo.dev/tutorial/image-picker/
    const openImagePickerAsync = async () => {

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage(pickerResult.uri);
    }

    //https://github.com/expo/firebase-storage-upload-example/blob/master/App.js
    //https://firebase.google.com/docs/storage/web/download-files#web-version-8_1
    const uploadImageAsync = async (uri) => {
        const storage = firebase.storage().ref();

        let filename = uri.substring(uri.lastIndexOf('/') + 1, uri.length)
        let uploadPath = 'images/' + filename
        const storageRef = firebase.storage().ref();
        let ref = storageRef.child(uploadPath)

        const img = await fetch(uri);
        const bytes = await img.blob();

        const uploadTaskSnapshot = await ref.put(bytes);

        const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

        return downloadURL
    }

    return (
        isAdded ? (
            <Text style={styles.logo}>Úspešne pridaný inzerát</Text>
        ) :
            (
                <KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }} style={{ height: Dimensions.get("window").height }} automaticallyAdjustContentInsets={false}>
                    <Text style={styles.logo}>Pridať inzerát</Text>
                    <TextInput style={styles.inputText} placeholder="Značka" onChangeText={(text) => setCarBrand(text)} />
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Model" onChangeText={(text) => setCarModel(text)} />
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Výkon" onChangeText={(text) => setEngineCap(text)} />
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Rok výroby" onChangeText={(text) => setYear(text)} />
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Počet  najazdenýchkilometrov" onChangeText={(text) => setMileage(text)} />
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Počet dverí" onChangeText={(text) => setDoors(text)} />
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Karoséria" onChangeText={(text) => setBody(text)} />
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Cena" onChangeText={(text) => setPrice(text)} />
                    <View style={styles.separator} />
                    <TextInput style={styles.inputText} placeholder="Popis" onChangeText={(text) => setDescription(text)} />
                    <View style={styles.separator} />
                    <View style={{ paddingVertical: 10 }} />
                    <TouchableOpacity
                        onPress={openImagePickerAsync}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Nahrať obrázok</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={addCar}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Pridať inzerát</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                </KeyboardAwareScrollView>
            )
>>>>>>> 826eeddb59b9f88daaa4dcb351577ec3bcf7bb51
    );
}

const styles = StyleSheet.create({
    container: {
<<<<<<< HEAD
        flex: 1,
=======
        flexGrow: 1,
>>>>>>> 826eeddb59b9f88daaa4dcb351577ec3bcf7bb51
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
<<<<<<< HEAD
        marginVertical: 8
=======
        marginVertical: 10
>>>>>>> 826eeddb59b9f88daaa4dcb351577ec3bcf7bb51
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
<<<<<<< HEAD
        borderColor: "#b7e4c7",
        borderWidth: 1,
        borderRadius: 3,
        paddingHorizontal: 10,
=======
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '80%',
        height: 50,
>>>>>>> 826eeddb59b9f88daaa4dcb351577ec3bcf7bb51
        paddingVertical: 8
    },
    logo: {
        fontSize: 50,
        textAlign: "center",
<<<<<<< HEAD
=======
        marginTop: 70,
>>>>>>> 826eeddb59b9f88daaa4dcb351577ec3bcf7bb51
        marginBottom: 50
    }
});

<<<<<<< HEAD
export default AddCarScreen
=======
<<<<<<< HEAD
export default AddCarScreen
>>>>>>> Stashed changes
=======
export default AddCarScreen
>>>>>>> 826eeddb59b9f88daaa4dcb351577ec3bcf7bb51
>>>>>>> frontend-work-jv
