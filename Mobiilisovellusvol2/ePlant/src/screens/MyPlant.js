import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
//import ProgressCircle from 'react-native-progress-circle';
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment';

export default function MyPlant(props) {
    const plant = props.navigation.state.params.plant;
    const channelId = plant.ruukkuid;
    const [ph, setPh] = useState(0);
    const [ec, setEc] = useState(0);
    const { navigate } = props.navigation;

    useEffect(() => {
        getData();
    }, []);

    // retrieving sensor statistics from the IoT device
    const getData = () => {
        const url = 'https://thingspeak.com/channels/' + channelId + '/feed.json';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.feeds[99].field1 != null) {
                    setPh(responseJson.feeds[99].field1);
                } else {
                    setPh('0')
                }
                if (responseJson.feeds[99].field2 != null) {
                    setEc(responseJson.feeds[99].field2);
                } else {
                    setEc('0')
                }
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.top}>
                <View>
                    <TouchableOpacity onPress={() => navigate('Home')}>
                        <Ionicons name="arrow-back-outline" size={30} style={styles.icon}/>
                    </TouchableOpacity>
                    <Text style={styles.plantname}>{plant.nimi}</Text>
                    <Text style={styles.plantheader}>{plant.laji}</Text>
                    <Image style={styles.topimage} source={require('../assets/smile.png')} />
                </View>
                <View>
                    <Image style={styles.topimage2} source={require('../assets/herbs.png')} />
                </View>
            </View>
            <View style={styles.container2}>
                <View style={styles.date}>    
                    <Text style={styles.datetext1}>{Moment(plant.paivays).format("DD.MM.YYYY")}</Text>
                </View>
                <View style={styles.progress}>
                    <View style={styles.ph}>
                        <Text style={styles.phtext}>pH-arvo</Text>
                        {/*}
                        <ProgressCircle
                            percent={20}
                            //percent={(ph / 2500 * 100).toFixed(0)}
                            radius={50}
                            borderWidth={4}
                            color="#63816D"
                            shadowColor="#E8E7E2"
                            bgColor="#fff"
                            outerCircleStyle={{ marginTop: 15, marginBottom: 15 }}

                        >
                            <Text style={styles.phtext2}>{(ph / 2500 * 100).toFixed(1)}</Text>
                        </ProgressCircle>
                        {*/} 
                    </View>
                    <View style={styles.ec}>
                        <Text style={styles.ectext}>EC-arvo</Text>
                      {/*}  <ProgressCircle
                            //percent={(ph / 2500 * 100).toFixed(0)}
                            percent={20}
                            radius={50}
                            borderWidth={4}
                            color="#63816D"
                            shadowColor="#E8E7E2"
                            bgColor="#fff"
                            outerCircleStyle={{ marginTop: 15, marginBottom: 15 }}

                        >
                            <Text style={styles.ectext2}>{(ph / 2500 * 100).toFixed(1)}</Text>
                        </ProgressCircle>
    {*/} 
                    </View>
                </View>
                <View>
                </View>
                <View style={styles.bottomheader}>
                    <Text style={styles.header}>Viimeisimmät tapahtumat</Text>
                    <TouchableOpacity
                        onPress={() => navigate('Notifications')}
                    >
                        <Text style={styles.showmore}>Näytä lisää</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
                    {/*<FlatList data={plant}
                        marginLeft={15}
                        renderItem={({ item }) =>
                            <View style={styles.bottomitem}>
                                <View>
                                    <View style={styles.circle} />
                                </View>
                                <View style={styles.bottomtext}>
                                    <Text style={styles.bottomtext1}>Tänään klo 8.20</Text>
                                    <Text style={styles.bottomtext2}>{item} kasteltu.</Text>
                                </View>
                            </View>
                        }
                    />*/}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E8E7E2',
        flex: 1,
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        marginTop:15
    },
    plantname: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 30
    },
    plantheader: {
        fontSize: 16,
        color: '#63816D',
        marginLeft: 30,
        marginTop: 5,
        fontWeight: '600',
        fontStyle: 'italic'
    },
    progress: {
        flexDirection: 'row',
        justifyContent: "center",
        alignContent: "center"
    },
    topimage: {
        width: 50,
        height: 50,
        marginLeft: 30,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 100
    },
    topimage2: {
        width: 250,
        height: 250,
        marginLeft: 20
    },
    container2: {
        flex: 2,
        backgroundColor: 'white',
        height: 600,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    date: {
        flexDirection: 'row',
        justifyContent:"space-between",
        marginTop: 15,
        marginBottom: 15
    },
    datetext1: {
        fontSize: 12,
        color: '#63816D',
        marginLeft: 20,
        fontWeight: 'bold'
    },
    detailstext: {
        fontSize: 12,
        color: '#63816D',
        marginRight: 20,
        fontWeight: 'bold'
    },
    ph: {
        borderRightColor: 'lightgrey',
        borderRightWidth: 1,
        marginRight: 20
    },
    phtext: {
        fontSize: 16,
        marginTop: 20,
        fontWeight: 'bold',
        marginRight: 50
    },
    phtext2: {
        fontSize: 22,
        color: '#63816D'
    },
    ectext: {
        fontSize: 16,
        marginTop: 20,
        fontWeight: 'bold',
        marginRight: 50
    },
    ectext2: {
        fontSize: 22,
        color: '#63816D'
    },
    header: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        marginBottom: 5
    },
    bottomheader: {
        flexDirection: 'row',
        justifyContent:"space-between",
        marginLeft: 10,
        marginTop: 50
    },
    showmore: {
        color: '#63816D',
        fontSize: 12,
        marginRight:15,
        fontWeight: 'bold'
    },
    bottom: {
        marginLeft: 10,
        flex: 2,
        //boxShadow: '2',
        shadowColor: '#A9A9A9',
        shadowOffset: {
            height: 2,
            width: 2
        },
        elevation: 4,
        borderRadius: 4,
        backgroundColor: 'white',
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    bottomitem: {
        flexDirection: "row",
        marginBottom: 5,
        marginTop: 10

    },
    bottomimage: {
        width: 30,
        height: 30,
        borderRadius: 40
    },
    bottomtext: {
        marginLeft: 10,
        marginBottom: 10,
        flex: 2
    },
    bottomtext1: {
        marginLeft: 5,
        fontSize: 12,
        color: "#ACACAC",
        fontWeight: "bold"
    },
    bottomtext2: {
        marginLeft: 5,
        fontSize: 16
    },  
    icon: {
        marginLeft: 30,
        marginTop: "40%",
        color: 'grey'
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 100/2,
        backgroundColor: '#eaaf7e'
    },

});