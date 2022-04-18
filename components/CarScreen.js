import React, { useState, useEffect } from 'react'
import { StyleSheet, Alert, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchAPI } from '../Api';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Stack = createStackNavigator()

const CarScreen = (props) => {
    const [car, setCar] = useState(props.route.params.car)
    const [isFetchingUser, setIsFetchingUser] = useState(true)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [bookmarks, setBookmarks] = useState([])

    const navigation = useNavigation()
    const isFocused = useIsFocused();

    useEffect(() => {
        //console.log(props.route.params)
        getUser()
    }, [])

    useEffect(() => {
        isFocused && getCar()
    }, [isFocused])

    const getUser = () => {

        fetchAPI(`api/autobazar/users/${props.route.params.car.author}`, 'GET', {}).then(result => {
            setFirstName(result[0].first_name)
            setLastName(result[0].last_name)
            setPhoneNumber(result[0].phone_number)
            setEmail(result[0].email)
            setBookmarks(result[0].favourites)
            setIsBookmarked(result[0].favourites.includes(car._id))
            setIsFetchingUser(false)
        })
    }

    const getCar = () => {
        fetchAPI(`api/autobazar/cars/${car._id}`, 'GET', {}).then(result => {
            setCar(result)
        })
    }

    const carDelete = () => {
        Alert.alert("Zmazať inzerát", "Ste si istý že chcete vymazať váš inzerát?", [{
            text: "Áno", onPress: () => {
                fetchAPI(`api/autobazar/cars/${car._id}`, 'DELETE', {}).then(result => {
                    Alert.alert("Inzerát bol úspešne vymazaný")
                    navigation.goBack()
                })
            },
        }, {
            text: "Nie", onPress: () => { }
        }])
    }

    const addToBookmarks = () => {

        let newBookmarks = bookmarks
        newBookmarks.push(car._id)

        const bookmarkObject = {
            favourites: newBookmarks
        }

        fetchAPI(`api/autobazar/users/${props.route.params.userId}`, 'PUT', bookmarkObject).then(result => {
            setIsBookmarked(true)
        })
    }

    const deleteFromBookmarks = () => {

        let newBookmarks = bookmarks
        for (var i = 0; i < newBookmarks.length; i++) {
            if (newBookmarks[i] === car._id) {
                newBookmarks.splice(i, 1);
            }
        }

        const bookmarkObject = {
            favourites: newBookmarks
        }

        fetchAPI(`api/autobazar/users/${props.route.params.userId}`, 'PUT', bookmarkObject).then(result => {
            setIsBookmarked(false)
        })
    }


    let imageUrl = { uri: car.image_photos[0] }
    return (
        <View style={styles.container}>
            <View style={styles.centerBtnContainer}>
                <View style={styles.manipulationBtnContainer}>
                    {(props.route.params.userId === car.author) ?
                        <TouchableOpacity style={styles.iconButton} onPress={() => carDelete()}><View><Ionicons name={'trash-outline'} size={30} /></View></TouchableOpacity> : <></>}
                    {(props.route.params.userId === car.author) ?
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('carEdit', { car: car, userId: props.route.params.userId })}>
                            <View>
                                <Ionicons name={'pencil-outline'} size={30} />
                            </View>
                        </TouchableOpacity> :
                        <></>}
                    {(props.route.params.userId != car.author) ? (
                        !isBookmarked ?
                            <TouchableOpacity style={styles.iconButton} onPress={() => addToBookmarks()}><View><Ionicons name={'bookmark-outline'} size={30} /></View></TouchableOpacity> :
                            <TouchableOpacity style={styles.iconButton} onPress={() => deleteFromBookmarks()}><View><Ionicons name={'bookmark'} size={30} /></View></TouchableOpacity>
                    ) : (<View />)
                    }
                </View>
            </View>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>{`${car.car_name}`}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={imageUrl} />
                </View>
                <View style={styles.separator} />
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}><Text style={styles.descriptionName}>Výkon</Text> {car.engine_cap}</Text>
                    <Text style={styles.description}><Text style={{ fontWeight: "bold" }}>Rok výroby</Text> {car.year}</Text>
                    <Text style={styles.description}><Text style={{ fontWeight: "bold" }}>Najazdené</Text> {car.mileage}km</Text>
                    <Text style={styles.description}><Text style={{ fontWeight: "bold" }}>Typ karosérie</Text> {car.body}</Text>
                    <Text style={styles.description}><Text style={{ fontWeight: "bold" }}>Počet dverí</Text> {car.doors}</Text>
                    <Text style={styles.description}><Text style={{ fontWeight: "bold" }}>Popis</Text> {car.description}</Text>
                    <View style={styles.separator} />
                    <Text style={styles.price}>Cena: {car.price}€</Text>
                    <View style={styles.separator} />
                    {!isFetchingUser ? <>
                        <Text style={styles.contact}><Text style={{ fontWeight: "bold" }}>Autor</Text> {firstName} {lastName}</Text>
                        <Text style={styles.contact}><Text style={{ fontWeight: "bold" }}>Telefónne číslo</Text> {phoneNumber} </Text>
                        <Text style={styles.contact}><Text style={{ fontWeight: "bold" }}>Mail</Text> {email} </Text>
                        <View style={styles.separator} />
                        <View style={{ paddingLeft: 30 }}>
                            <TouchableOpacity style={styles.iconButton}><View><Ionicons name={'call-outline'} size={30} /></View></TouchableOpacity>
                        </View>
                    </> : <ActivityIndicator color="#081c15" />}
                </View>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingBottom: 10
    },
    separator: {
        paddingVertical: 10
    },
    headingContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    descriptionContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    descriptionName: {
        fontWeight: "bold"
    },
    description: {
        paddingLeft: 30,
        color: '#515966',
        fontSize: 16,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        backgroundColor: '#FFF',
        width: 320,
        height: 200,
        marginTop: 10,
        borderRadius: 5
    },
    price: {
        fontWeight: 'bold',
        fontSize: 22,
        paddingLeft: 30,
    },
    contact: {
        paddingLeft: 30,
        color: '#515966',
        fontSize: 16,
    },
    centerBtnContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    manipulationBtnContainer: {
        display: 'flex',
        width: '90%',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    iconButton: {

    }
});

export default CarScreen

