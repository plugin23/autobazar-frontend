import React, { useState } from 'react'
import { StyleSheet, Text, View,  TouchableOpacity } from 'react-native';

const UserItem = (props) => {
    const [car, setCar] = useState(props.car)
    
    return (
            <TouchableOpacity>
            <View styles={styles.container}>
                <View styles={styles.textContainer}>
                    <View style={styles.separator} />
                    <View style={styles.headingContainer}>
                    <Text style={styles.heading}> Meno: {`${car.first_name}`}</Text>
                    <Text style={styles.heading}> Priezvisko: {`${car.last_name}`}</Text>
                    <Text style={styles.heading}> Tel. číslo: {`${car.phone_number}`}</Text>
                    <Text style={styles.heading}> Email: {`${car.email}`}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.separator} />

            <TouchableOpacity
                        onPress=  {()=>props.logOut()}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Odhlásiť sa</Text>
                </TouchableOpacity>                
        </TouchableOpacity>                     
    );
    
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 10
    },
    separator: {
        marginVertical: 5
    },
    headingContainer: {
        paddingHorizontal: 10,
        paddingVertical: 0,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    description: {
        paddingLeft: 10,
        color: '#909090',
        fontSize: 14,
    },
    image: {
        backgroundColor: '#FFF',
        width: 330,
        height: 170,
        marginTop: 10,
        borderRadius: 20,
    },
});

export default UserItem