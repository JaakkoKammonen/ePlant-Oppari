import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import SetImage from '../components/SetImage';
import { Ionicons } from '@expo/vector-icons';

export default function Plant(props) {

    // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

    const plant = props.navigation.state.params.plant;
    const plantImage = SetImage(plant.laji.toLowerCase());
    const { navigate } = props.navigation;

    // returning plant data based on props from Search.js and plantImage from SetBackgroundImg.js
    return (
        <ScrollView style={styles.container}>
                <Image style={styles.topimage} source={plantImage} />
            <View>
                <TouchableOpacity onPress={() => navigate('Search')}>
                    <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
                </TouchableOpacity>
                <View style={styles.top}>
                    <Text style={styles.header}>{plant.laji}</Text>
                    <Text style={styles.header2}>{plant.latina}</Text>
                </View>
                <View style={styles.view1}>
                    <View style={styles.box}>
                        <View>
                            <Image style={styles.icon} source={require('../assets/hand-holding-plant-icon.png')} />
                        </View>
                        <View>
                            <Text style={styles.boxtext1}>Care</Text>
                            <Text style={styles.boxtext2}>{plant.hoito}</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View >
                            <Image style={styles.icon} source={require('../assets/wateringcan.png')} />
                        </View>
                        <View>
                            <Text style={styles.boxtext1}>Water needs</Text>
                            <Text style={styles.boxtext2}>{plant.vesitarve}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.view2}>
                    <View style={styles.box}>
                        <View >
                            <Image style={styles.icon} source={require('../assets/cloud.png')} />
                        </View>
                        <View>
                            <Text style={styles.boxtext1}>Lighting needs</Text>
                            <Text style={styles.boxtext2}>{plant.valotarve}</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View>
                            <Image style={styles.icon} source={require('../assets/location.png')} />
                        </View>
                        <View>
                            <Text style={styles.boxtext1}>Origin</Text>
                            <Text style={styles.boxtext2}>{plant.origin}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.description}>{plant.kuvaus}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topimage: {
        width: '100%',
        height: 250
    },
    arrow: {
        marginLeft: 20,
        marginTop: 10,
        color: 'grey'
    },
    top: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginLeft: 10,
        marginTop: 10
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    header2: {
        fontSize: 10,
        color: '#63816D',
        fontWeight: '600',
        fontStyle: 'italic',
        marginRight: 20
    },
    view1: {
        flexDirection: 'row',
        marginTop: 15,
    },
    box: {
        flexDirection: "row",
        marginLeft: 15,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        marginTop: 10,
        padding:15,
        width: "45%"
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 3,
        marginRight: 15,
        tintColor: '#555555'
    },
    boxtext1: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#404040'
    },
    boxtext2: {
        fontSize: 14,
        color: '#404040',
    },
    view2: {
        flexDirection: 'row',
    },
    description: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        fontSize: 14
    }
});