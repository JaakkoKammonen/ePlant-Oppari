import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import firebase from '../components/firebase';

export default function Notifications() {
    const [myPlants, setMyPlants] = useState([]);

    console.disableYellowBox = true;

    // retrieving firebase data and inserting it to "plants" list
    useEffect(() => {
        firebase.database().ref('omatkasvit/').on('value', snapshot => {
            const plants = Object.values(snapshot.val());
            setMyPlants(plants);
        });
    }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Ilmoitukset</Text>
            </View>
            <View style={styles.bottom}>
                <FlatList
                    data={myPlants}
                    marginLeft={15}
                    renderItem={({ item }) =>
                        <View style={styles.notification}>
                            <View>
                                <View style={styles.circle}/>
                            </View>
                            <View style={styles.notificationTexts}>
                                <Text style={styles.subHeader}>Tänään klo 8.20</Text>
                                <Text style={styles.title}>{item.nimi} kasteltu.</Text>
                            </View>
                        </View>
                    }
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
        flex: 1
    },
    header: {
        shadowColor: '#DEDDDD',
        shadowOpacity: 2,
        shadowOffset:{
            height: 2,
            width: 2
        },
        elevation:4,
        backgroundColor: '#FAFAFA'
    },
    headerText: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 48,
        paddingBottom: 20,
        borderBottomColor: '#DEDDDD', 
        borderBottomWidth: 1,
    },
    bottom: {
        marginLeft: 10,
        flex: 2,
        fontWeight: 'bold',
        fontSize: 14,
        marginTop:  20

    },
    notification: {
        flexDirection: "row", 
        width: 179, 
        height: 40, 
        marginBottom: 35
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 100/2,
        backgroundColor: '#eaaf7e'
    },
    notificationTexts: {
        marginLeft: 10, 
        marginBottom: 10, 
        flex: 2
    },
    subHeader: {
        marginLeft: 5, 
        fontSize: 12, 
        color: "#ACACAC", 
        fontWeight: "bold", 
        marginBottom: 6
    },
    title: {
        marginLeft: 5,
        fontSize: 16
    },
});
