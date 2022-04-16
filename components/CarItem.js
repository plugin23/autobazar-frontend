import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import CarScreen from './CarScreen'
import { useNavigation } from '@react-navigation/native';

const CarItem = (props) => {
    const [car, setCar] = useState(props.car)
    const [userId, setUserId] = useState(props.userId)
    let imageUrl = {uri : car.image_photos[0]}
    const navigation = useNavigation()
    
    return (
        <TouchableOpacity onPress={() => navigation.navigate('carScreen', {car: car, userId: userId})}>
            <View styles={styles.container}>
                <View>
                    <Image style={styles.image} source={imageUrl} />
                </View>
                <View styles={styles.textContainer}>
                    <View style={styles.separator} />
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>{`${car.car_brand} ${car.car_model}`}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{`${car.engine_cap} ${car.year} ${car.mileage}km ${car.price}€`}</Text>
                    </View>
                </View>
            </View>
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

export default CarItem