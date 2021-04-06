import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import SetBackgroundImage from '../components/SetBackgroundImg.js';
import { Ionicons } from '@expo/vector-icons';

export default function Plant(props) {
    const plant = props.navigation.state.params.plant;
    const plantImage = SetBackgroundImage(plant.laji);
    const { navigate } = props.navigation;

    console.disableYellowBox = true;

    const add = () => {
        alert('tää ei tee vielä mitään')
    }

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
                            <Text style={styles.boxtext1}>Hoito</Text>
                            <Text style={styles.boxtext2}>{plant.hoito}</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View >
                            <Image style={styles.icon} source={require('../assets/wateringcan.png')} />
                        </View>
                        <View>
                            <Text style={styles.boxtext1}>Veden tarve</Text>
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
                            <Text style={styles.boxtext1}>Valon tarve</Text>
                            <Text style={styles.boxtext2}>{plant.valotarve}</Text>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View>
                            <Image style={styles.icon} source={require('../assets/location.png')} />
                        </View>
                        <View>
                            <Text style={styles.boxtext1}>Alkuperä</Text>
                            <Text style={styles.boxtext2}>{plant.origin}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.description}>{plant.kuvaus}</Text>
                <Text style={styles.header3}>Oman kasvini</Text>
                <View style={styles.bottom}>
                    <View style={styles.border}>
                        <Text style={styles.bottomtext}>Teuvo</Text>
                        <Image style={styles.bottomimage} source={require('../assets/flowerpot.png')} />
                    </View>
                    <TouchableOpacity style={styles.add}
                        onPress={add}
                        title="Add">
                        <Text style={styles.addtext}>Lisää kasvi</Text>
                        <Image style={styles.addimage} source={require('../assets/plus.png')} />
                    </TouchableOpacity>
                </View>
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
    view2: {
        flexDirection: 'row',
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
    description: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        fontSize: 14
    },
    header3: {
        marginLeft: 10,
        marginTop: 15,
        fontSize: 18,
        fontWeight: 'bold'
    },
    bottom: {
        flexDirection: 'row',
        marginBottom: 70
    },
    border: {
        borderWidth: 2,
        borderColor: "#0000000D",
        borderRadius: 2,
        width: 150,
        marginTop: 15,
        marginLeft: 15,
    },
    bottomtext: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 10,
        fontWeight: "bold"
    },
    bottomimage: {
        width: 150,
        height: 150
    },
    add: {
        backgroundColor: '#F5F5F5',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        width: 150,
        borderRadius: 4
    },
    addtext: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 50,
        fontWeight: "bold"
    },
    addimage: {
        width: 50,
        height: 50,
        marginLeft: 50,
        marginTop: 15
    },
    arrow: {
        marginLeft: 20,
        marginTop: 10,
        color: 'grey'
    }

});
