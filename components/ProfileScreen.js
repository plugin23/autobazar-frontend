import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react';
import CarItem from './CarItem'
import CarEdit from './CarEdit'
import CarScreen from './CarScreen';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';


const Stack = createStackNavigator()

const ProfileScreen = (props) => {

    const [isFetching, setIsFetching] = useState(true)
    const [isFetchingUser, setIsFetchingUser] = useState(true)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [ownedCars, setOwnedCars] = useState([])

    const waitForSocketConnection = (socket, callback) => {
        setTimeout(
            function () {
                if (socket.readyState === 1) {
                    if (callback != null){
                        callback();
                    }
                } else {
                    waitForSocketConnection(socket, callback);
                }
    
            }, 5); // wait 5 milisecond for the connection...
    }
    
    useEffect(() => { 
        const getCarsObject = async () => {
            
            let fetchObject = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            }
            let userWs = new WebSocket(`ws://fiit-autobazar-backend.herokuapp.com/api/autobazar/users/${props.userId}`)
            let userObj;

            usersWs.onopen = () => {
                waitForSocketConnection(usersWs, function(){
                    //console.log("message sent!!!");
                    usersWs.send(JSON.stringify(fetchObject))
                });
    
                userWs.onmessage = (e) => {
                    const response = JSON.parse(e.data)
                    userObj = response
                    console.log(response)
                    setFirstName(response[0].first_name)
                    setLastName(response[0].last_name)
                    setPhoneNumber(response[0].phone_number)
                    setEmail(response[0].email)
                    setOwnedCars(response[0].own_advertisement)
                    userWs.close()
                }
            }

            //const userObj = await fetch(`https://fiit-autobazar-backend.herokuapp.com/api/autobazar/users/${props.userId}`).then(response => response.json())

            let carObjects = []
            for (var i = 0; i < userObj[0].own_advertisement.length; i++) {
                let carId = userObj[0].own_advertisement[i]
                
                let carWs = new WebSocket(`ws://fiit-autobazar-backend.herokuapp.com/api/autobazar/cars/${carId}`)
                let carObj;
                
                carsWs.onopen = () => {
                    waitForSocketConnection(carsWs, function(){
                        console.log("message sent!!!");
                        carsWs.send(JSON.stringify(fetchObject))
                    });
        
                    carWs.onmessage = (e) => {
                        const response = JSON.parse(e.data)
                        carObj = response
    
                        if (!carObj.errors) {
                            carObjects.push(carObj)
                        }
                        carWs.close()
                    }
                }

            }
            
            setOwnedCars(carObjects)
        }

        isFetching && getCarsObject().then(() => {
            setIsFetchingUser(false)
            setIsFetching(false)
        })
        
    }, [isFetching])


    const onRefresh = () => {
        setIsFetching(true)
        setIsFetchingUser(true)
    }

    const renderItem = (item) => {
        return (
            <CarItem car={item.item} userId={props.userId}/>
        )
    }

    const itemSeparator = () => {
        return (
            <View style={styles.separator} />
        )
    }

    const renderHeader = () => {
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <Text style={styles.logo}>Profil</Text>
                    <Text style={styles.contact}><Text style={{ fontWeight: "bold" }}>Meno:</Text> {firstName}</Text>
                    <Text style={styles.contact}><Text style={{ fontWeight: "bold" }}>Priezvisko:</Text> {lastName}</Text>
                    <Text style={styles.contact}><Text style={{ fontWeight: "bold" }}>Telefónne číslo:</Text> {phoneNumber}</Text>
                    <Text style={styles.contact}><Text style={{ fontWeight: "bold" }}>Email: </Text> {email}</Text>
                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={props.logOut}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Odhlásiť sa</Text>
                    </TouchableOpacity>
                    <Text style={styles.smallLogo}>Moje inzeráty</Text>
                </View>
            </View>
        )  
    }
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="profileScreen" options={{title: '', headerShown: false}} children={(props) =>
                <View style={styles.container}>
                    {isFetching ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <FlatList
                            data={ownedCars}
                            renderItem={item => renderItem(item)}
                            keyExtractor={item => item._id.toString()}
                            ItemSeparatorComponent={itemSeparator}
                            ListHeaderComponent={renderHeader}
                            showsVerticalScrollIndicator={false}
                            refreshing={isFetching}
                            onRefresh={onRefresh}
                        />
                    )}
                </View>
                
            } />
            <Stack.Screen name="carScreen" options={{title: ''}} children={(props) =>
                <ScrollView>
                    <CarScreen {...props} />
                </ScrollView>
            } />

            <Stack.Screen name="carEdit" options={{ title: '' }} children={(props) =>
                <CarEdit {...props} />
            } />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    separator: {
        marginVertical: 8
    },
    logo: {
        fontSize: 45,
        marginTop: 30,
        fontWeight: "bold",
        marginBottom: 20
    },
    smallLogo: {
        fontSize: 25,
        marginTop: 20,
        fontWeight: "bold",
        marginBottom: 20
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
    profileContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    loading: {
        paddingVertical: 50
    }
});

export default ProfileScreen