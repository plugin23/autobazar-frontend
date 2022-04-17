import React, { useState } from 'react'
import { StyleSheet, Text, View,  TouchableOpacity } from 'react-native';

const FavouriteItem = (props) => {
    const [car, setCar] = useState(props.car)

    console.log(props)
    console.log(props.car)
    
    return (
        <TouchableOpacity>
            <View styles={styles.container}>
                <View styles={styles.textContainer}>
                    <View style={styles.separator} />
                    <View style={styles.headingContainer}>
                    <Text style={styles.heading}> Favouriteeeeeeeees</Text>
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

export default FavouriteItem