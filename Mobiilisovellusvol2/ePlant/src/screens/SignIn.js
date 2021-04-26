import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import SetBackgroundImage from '../components/SetBackgroundImg.js';
import { Ionicons } from '@expo/vector-icons';

export default function SignIn(props) {
    const plant = props.navigation.state.params.plant;
    const plantImage = SetBackgroundImage(plant.laji);
    const { navigate } = props.navigation;

    // returning plant data based on props from Search.js and plantImage from SetBackgroundImg.js
    return (
        <ScrollView style={styles.container}>
            <View style={{ flex: 1 }}>
                <Image style={styles.topimage} source={plantImage} />
            </View>
            <View>
                <TouchableOpacity onPress={() => navigate('Search')}>
                    <Ionicons name="md-arrow-round-back" size={30} style={styles.arrow} />
                </TouchableOpacity>
                <Text style={styles.description}>Tähän formi, jossa käyttäjä täyttää tietonsa</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
        flex: 1,
    },
    topimage: {
        width: '100%',
        height: 250
    },
    description: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        fontSize: 14
    },
    arrow: {
        marginLeft: 20,
        marginTop: 10,
        color: 'grey'
    }
});