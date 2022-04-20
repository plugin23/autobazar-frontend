import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC3bvlOlY1gGFWUiSDMg9YA94E8hwGSwuo",
    authDomain: "mtaa-autobazar-storage.firebaseapp.com",
    projectId: "mtaa-autobazar-storage",
    storageBucket: "mtaa-autobazar-storage.appspot.com",
    messagingSenderId: "276629828442",
    appId: "1:276629828442:web:876afc5961294466e47963",
    measurementId: "G-XL77BC1PLX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator()

const AddCarScreen = (props) => {

    const [carBrand, setCarBrand] = useState("")
    const [engineCap, setEngineCap] = useState("")
    const [year, setYear] = useState(0)
    const [mileage, setMileage] = useState(0)
    const [price, setPrice] = useState(0)
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
            

            const fetchObject = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(bodyObject)
            }
    
            fetch('https://fiit-autobazar-backend.herokuapp.com/api/autobazar/cars' , fetchObject).then(response => response.json()).then(response => {
                
                if (response._id) {
                    //alert(result)                   
                    setIsAdded(true)
                    edit_user(response)
                }
                else { //ak uzivatel zada zle heslo alebo meno
                    Alert.alert("Údaje, ktoré ste zadali nie sú správne", [{ text: "OK", onPress: () => { } }])
                }
            })        
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


    const edit_user = (result) => {

        const bodyObjectUser = {
            own_advertisement: result._id 
        }
           

        const fetchObject = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bodyObjectUser)
        }

        fetch(`https://fiit-autobazar-backend.herokuapp.com/api/autobazar/users/${result.author}/own_advertisement` , fetchObject).then(response => response.json()).then(response => {
            if (response.id) {
                //alert(result)
                props.loggedIn(response.id)
            }
            else { //ak uzivatel zada zle heslo alebo meno
                Alert.alert("Nesprávne údaje", "Údaje, ktoré ste zadali nie sú správne", [{ text: "OK", onPress: () => { } }])
            }
        })
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
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        marginVertical: 10
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
        width: '80%',
        height: 50,
        paddingVertical: 8
    },
    logo: {
        fontSize: 50,
        textAlign: "center",
        marginTop: 70,
        marginBottom: 50
    }
});

export default AddCarScreen