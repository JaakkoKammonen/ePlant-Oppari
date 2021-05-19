import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import moment from "moment";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import setImage from "../components/SetImage"

export default function MyPlant(props) {
    const plant = props.navigation.state.params.plant;
    console.log(plant)
    const channelId = plant.ePlantPot.channel_id;
    const [ph, setPh] = useState(0);
    const [ec, setEc] = useState(0);
    const [updateDate, setUpdateDate] = useState(0);
    const { navigate } = props.navigation;


    useEffect(() => {
        getData();
    }, []);

    
    // retrieving sensor statistics from the IoT device
    const getData = () => {
        const url = 'https://api.thingspeak.com/channels/' + channelId + '/feeds.json';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson.feeds)
                //console.log(responseJson.feeds[responseJson.feeds.length-1])
                if (responseJson.feeds[responseJson.feeds.length-1].field1 != null) {
                    //console.log(responseJson.feeds[99])
                    setUpdateDate(responseJson.feeds[responseJson.feeds.length-1].created_at)
                    setPh(responseJson.feeds[responseJson.feeds.length-1].field1);
                } else {
                    
                    setPh('0')
                }
                if (responseJson.feeds[responseJson.feeds.length-1].field2 != null) {
                    setEc(responseJson.feeds[responseJson.feeds.length-1].field2);
                } else {
                    setEc('0')
                }
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });
    }

    const DeletePlant = () => {
        console.log(plant)
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.top}>
                <View>
                    <TouchableOpacity onPress={() => navigate('Home')}>
                        <Ionicons name="arrow-back-outline" size={30} style={styles.icon}/>
                    </TouchableOpacity>
                    <Text style={styles.plantname}>{plant.plantName}</Text>
                    <Text style={styles.plantheader}>{plant.species}</Text>
                    <Image style={styles.topimage} source={require('../assets/smile.png')} />
                </View>
                <View>
                    <Image style={styles.topimage2} source={setImage(plant.species.toLowerCase())} />
                </View>
            </View>
            <View style={styles.container2}>
                <View style={styles.date}>    
                    <Text style={styles.datetext1}>{moment(plant.paivays).format("DD.MM.YYYY")}</Text>
                    <Text style={styles.moredetails}>More details</Text>
                </View>
                <View style={styles.progress}>
                    <View style={styles.ph}>
                        <Text style={styles.phtext}>pH value</Text>
                        <AnimatedCircularProgress
                        size={100}
                        width={10}
                        fill={ph}
                        tintColor="#00e0ff"
                        //onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875">
                            {
                                (fill) => (
                                <Text>
                                   {ph}
                                </Text>
                                )
                            }
                            </AnimatedCircularProgress>
                    </View>
                    <View style={styles.ec}>
                        <Text style={styles.ectext}>ppm value</Text>
                        <View>
                        <AnimatedCircularProgress
                        size={100}
                        width={10}
                        fill={ec}
                        tintColor="#00e0ff"
                        //onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875">
                            {
                                (fill) => (
                                <Text>
                                   {ec}
                                </Text>
                                )
                            }
                            </AnimatedCircularProgress>
                    </View>
                    </View>
                </View>
                <View>
                </View>

                <Text style={styles.value}>Values were updated in {updateDate} </Text>
            
                <Button
                buttonStyle={styles.btnmyplant}
                title= "Delete plant"
                onPress = {() => DeletePlant()}
                />
                <View style={styles.bottomheader}>
                    
                    <TouchableOpacity
                        onPress={() => navigate('Notifications')}
                    >
                        <Text style={styles.showmore}>Notifications</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        marginTop:15
    },
    btnmyplant: {
        backgroundColor: "#63816D",
        borderRadius: 3,
        marginTop: 20,
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginLeft: 100,
        marginRight: 100
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
    value: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 30
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
        width: 200,
        height: 200,
        marginLeft: 40,
        marginTop: 10,
        borderRadius: 160
    },
    container2: {
        marginTop: 20,
        flex: 2,
        backgroundColor: 'white',
        height: 600,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
        marginRight: 30,
        paddingLeft: 30,
        paddingRight: 30
    },
    phtext: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
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
        marginBottom: 10,
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
    moredetails: {
        color: '#63816D',
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 20
    },
    bottom: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        flex: 2,
        shadowColor: 'rgba(0,0,0, .1)', // IOS
        shadowOffset: { height: 3, width: 2 }, // IOS
        shadowOpacity: 3, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // android
        backgroundColor: 'white',
        borderRadius: 4
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