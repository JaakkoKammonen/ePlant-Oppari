import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Safety(props) {

    // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

    const { navigate } = props.navigation;

    // returning plant data based on props from Search.js and plantImage from SetBackgroundImg.js
    return (
        <ScrollView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigate('Settings')}>
                    <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
                </TouchableOpacity>
                <Text style={styles.description}>Tähän turvallisuus</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    arrow: {
        marginLeft: 20,
        marginTop: 10,
        color: 'grey'
    },
    description: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        fontSize: 14
    }
});