import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from "moment";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import setImage from "../components/SetImage"
import FireBasemiddleware from '../components/Redux/03-middleware/FireBasemiddleware';
import swal from 'sweetalert';
import { ScrollView } from 'react-native-gesture-handler';
import ThingSpeakMiddleware from '../components/Redux/03-middleware/ThingSpeakMiddleware';

export default function MyPlant(props) {

    // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

    const [notifications, setNotifications] = useState("Loading...")
    const [updateDate, setUpdateDate] = useState("Loading...");

    const plant = props.navigation.state.params.plant[1];
    const plantID = props.navigation.state.params.plant[0];
    const channelId = plant.ePlantPot.channel_id;
    const write_apikey = plant.ePlantPot.write_apikey;
    const ePlantName = plant.ePlantPot.ePlantName;
    const { navigate } = props.navigation;
    //console.log(ePlantName)

    const [Field1, setField1] = useState({ 
        name: plant.ePlantPot.ePlantModel.Field1.Name,
        field:  plant.ePlantPot.ePlantModel.Field1.Field, 
        value: 0 
    });

    const [Field2, setField2] = useState({ 
        name: plant.ePlantPot.ePlantModel.Field2.Name,
        field:  plant.ePlantPot.ePlantModel.Field2.Field, 
        value: 0 
    });

    const [Field3, setField3] = useState({ 
        name: plant.ePlantPot.ePlantModel.Field3.Name, 
        field:  plant.ePlantPot.ePlantModel.Field3.Field
    });
    
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
                    setField1({...Field1, value: responseJson.feeds[responseJson.feeds.length-1].field1});
                    setNotifications(responseJson.feeds)
                } else {
                    setField1({...Field1, value: 0})
                    setNotifications(responseJson.feeds)
                    setUpdateDate(responseJson.feeds[responseJson.feeds.length-1].created_at)
                }

                if (responseJson.feeds[responseJson.feeds.length-1].field2 != null) {
                    setField2({...Field2, value: responseJson.feeds[responseJson.feeds.length-1].field2});
                } else {
                    setField2({...Field2, value: 0})
                }
            })
            .catch((error) => {
                swal({
                title: "Error",
                text: "Something went wrong while getting plant data. Check that your Channel Id is correct!",
             })
             //console.log(error)
            });
    }

    const PlantUpdateDate = () =>  {
        // Jos arvo on Loading => Palautetaan else arvo, eli datan hakuvirhe
        // Jos arvo on saatavilla parsitaan se vuoteen, kk, päivään ja aikaa ja näytetään se!
        if (updateDate !== "Loading...") {
        let year = updateDate.slice(0, 4)
        let month = updateDate.slice(5, 7)
        let day = updateDate.slice(8, 10)
        let time = updateDate.slice(11, 19)

        return ( 
            <Text style={styles.value}>Last updated: <Text style={styles.updateformat}>{day}.{month}.{year} at: {time} </Text></Text>
        )
        } else {
            return (
                <Text style={styles.value}>Last updated: Error getting data </Text>
            )
        }
   
    }


    const DeletePlant = () => {
    // Poistetaan kasvi. Ensin kysytään oletko varma. Jos painetaan Do it!, käytetään middlewarea poistossa.
    // Jos painetaan Cancel -> ilmoitetaan, että kasville ei tehdä mitään.
        swal({
            title: "Delete plant?",
            text: "Are you sure?",
            icon: "error",
            buttons: [true, "Do it!"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

              FireBasemiddleware.DeleteUserMyPlant(plantID, navigate);  

              swal("Poof! Plant deleted!", {
                icon: "success",
                timer: 2000,
              });
            } else {
              swal("Your plant is safe!", {
                button: "Close",
                timer: 2000,
              });
            }
          });
    }


    const timeParser = (date) => {
            // Notifikaatioiden ajan muunnos.
            // Jos datan haku on onnistunut tätä käytetään. 
            // Parsitaan se vuoteen, kk, päivään ja aikaa  => Palautetaan ne!
            let year = date.slice(0, 4)
            let month = date.slice(5, 7)
            let day = date.slice(8, 10)
            let time = date.slice(11, 19)

            return( day + "." + month + "." + year + " at: " +time)
    }

    const NotificationMaker = () => {
        
        //console.log(notifications)
        // Jos datan haussa tapahtuu error => arvoksi jää Loading...
        // Tällöin palautetaan else eli teksti, jossa lukee että haussa tapahtui error
        // Jos notificaatiot tulevat normaalisti if arvo on tosi.
        if (notifications !== "Loading...") {

        // Haetaan viimeiset kymmenen arvoa!
        let lastTen = notifications.slice(notifications.length-11, notifications.length-1).reverse()
        
        return(        
            <FlatList data={lastTen}
                marginLeft={15}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <View style={styles.bottomitem}>
                        <View>
                           <Image style={styles.circle} source={setImage(plant.species.toLowerCase())}/>
                        </View>
                            <View style={styles.bottomtext}>
                            <Text style={styles.bottomtext1}>{timeParser(item.created_at)}</Text>
                            <Text style={styles.bottomtext2}>{plant.plantName}'s value were updated</Text>
                            <Text style={styles.field01}>{Field1.name}:<Text style={styles.field01value}> {item.field1}</Text></Text>
                            <Text style={styles.field02}>{Field2.name}:<Text style={styles.field02value}> {item.field2}</Text></Text>
                        </View>
                    </View>
                }
            />
        )

        } else {
            return (
                <Text style={styles.error}>Error getting data! Check your ePlant channel_id, or turn on Get ePlant sensor data</Text>
            )
        }
    }


    const HandleSelect = (item, text) => {
        if(text == "OFF") {
            if (item.name === "AirPump") {
                ThingSpeakMiddleware.AirPumpOFF(write_apikey, item.field )
            } 
        } 

        if(text == "ON") {
            if (item.name === "AirPump") {
                ThingSpeakMiddleware.AirPumpON(write_apikey, item.field )
            }
        }
        console.log(item, text)

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

                    <Text style={styles.fieldtxt}>{Field3.name}</Text>
                    <View style={styles.buttonwrapper}>
                    <TouchableHighlight 
                    activeOpacity={1}
                    onPress={ () => HandleSelect(Field3, "ON")}>
                    <View style={styles.onbutton}>
                    <Text style={styles.on}>ON</Text>
                    </View>
                    </TouchableHighlight>

                    <TouchableHighlight 
                    activeOpacity={1}
                    onPress={ () => HandleSelect(Field3, "OFF")}>
                    <View style={styles.offbutton}>
                    <Text style={styles.off}>OFF</Text>
                    </View>
                    </TouchableHighlight>
                    </View>
                    </View>
                    <View>
                    <Image style={styles.topimage2} source={setImage(plant.species.toLowerCase())} />
                </View>
            </View>
            <View style={styles.container2}>
                <View style={styles.date}>    
                    <Text style={styles.datetext1}>{moment(plant.paivays).format("DD.MM.YYYY")}</Text>
                      <Text style={styles.potname}>Pot name:<Text style={styles.potdata}> {ePlantName} </Text></Text>
                    <View style={styles.moredetails}>
                <Ionicons 
                name="ios-trash" 
                size={24} 
                color="#63816D"
                buttonStyle={styles.btnmyplant}
                title= "Delete plant"
                onPress = {() => DeletePlant()}
                />
                </View>
                </View>
                <View style={styles.progress}>
                    <View style={styles.field1}>
                        <Text style={styles.field1Value}>{Field1.name}</Text>
                        <AnimatedCircularProgress
                        size={100}
                        width={7}
                        fill={parseFloat(Field1.value, 10)}
                        tintColor="#51799B"
                        backgroundColor="#E8E7E2">
                            {
                                (fill) => (
                                <Text style={styles.filltext}>
                                   {fill}
                                </Text>
                                )
                            }
                            </AnimatedCircularProgress>
                    </View>
                    <View>
                        <Text style={styles.field2Value}>{Field2.name}</Text>
                        <View>
                        <AnimatedCircularProgress
                        size={100}
                        width={7}
                        fill={parseFloat(Field2.value, 10)}
                        tintColor="#51799B"
                        backgroundColor="#E8E7E2">
                            {
                                (fill) => (
                                <Text style={styles.filltext}>
                                   {fill}
                                </Text>
                                )
                            }
                            </AnimatedCircularProgress>
                    </View>
                    </View>
                </View>

                {PlantUpdateDate()}

                <View style={styles.bottomheader}>
                <Text style={styles.notifi}>Notifications</Text>
                </View>
                <ScrollView 
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollable}>
                <View style={styles.bottom}>

                {NotificationMaker()}

                </View>
                </ScrollView>
                </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    value: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 30
    },
    updateformat: {
        fontSize: 14,
        fontWeight: 'normal',
        marginTop: 30,
        marginLeft: 3
    },
    bottomheader: {
        justifyContent:"space-between",
        flexDirection: 'row',
        marginLeft: 10,
    },
    bottomitem: {
        flexDirection: "row",
        marginBottom: 5,
        marginTop: 10
    },
    circle: {
        width: 40,
        height: 40,
        marginTop: 30,
        marginLeft: 20,
        borderRadius: 100/2,
        backgroundColor: '#eaaf7e'
    },
    bottomtext: {
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 5,
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
    field01: {
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 4,
    },
    field01value: {
        fontSize: 13,
        fontWeight: "normal",
        marginLeft: 3,
    },
    field02: {
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 4,
    },
    field02value: {
        fontSize: 13,
        fontWeight: "normal",
        marginLeft: 3,
    },
    error: {
        fontSize: 14,
        fontWeight: 'normal',
        marginLeft: 10,
        marginBottom: 15
    },
    container: {
        flex: 2,
        padding: 3,
        backgroundColor: '#F0F0F0',
    },
    top: {
        flexDirection: 'row',
        marginTop: 15,
        flex: 1
    },
    icon: {
        marginLeft: 30,
        marginTop: "40%",
        color: 'grey'
    },
    plantname: {
        fontSize: 20,
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
    fieldtxt: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 20,
        marginBottom: 10
    },
    buttonwrapper: {
        flexDirection: 'row',
        marginLeft: 30,
    },
    onbutton: {
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#63816D",
        padding: 5,
        borderRadius: 10,
        color: "white",
        width: 40,
        height: 30,
    },
    on: {
        color: "white",
        width: 40,
        height: 30,
    },
    offbutton: {
        textAlign: "center",
        alignItems: "center",
        backgroundColor: "#63816D",
        padding: 5,
        borderRadius: 10,
        width: 40,
        height: 30,
        marginLeft: 5
    },
    off: {
        color: "white",
        width: 40,
        height: 30,
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
        marginLeft: 30,
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
    potname: {
        fontSize: 12,
        color: '#63816D',
        fontWeight: 'bold',
    },
    potdata: {
        fontSize: 12,
        color: '#63816D',
        fontWeight: 'normal',
    },
    moredetails: {
        color: '#63816D',
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 20
    },
    btnmyplant: {
        backgroundColor: "#63816D",
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        width: 150,
        height: 30,
    },
    progress: {
        flexDirection: 'row',
        justifyContent: "center",
        alignContent: "center"
    },
    field1: {
        borderRightColor: 'lightgrey',
        borderRightWidth: 1,
        marginRight: 30,
        paddingLeft: 30,
        paddingRight: 30
    },
    field1Value: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        marginRight: 50
    },
    filltext: {
        fontSize: 22,
        color: '#63816D'
    },
    field2Value: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        marginRight: 50
    },
    notifi: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 20,
    },
    scrollable: {
        margin: 10, 
        maxHeight: 250,
    },
    bottom: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        marginTop: 5,
        flex: 4,
        shadowColor: 'rgba(0,0,0, .1)', // IOS
        shadowOffset: { height: 3, width: 2 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // android
        backgroundColor: '#fbfbfb',
        borderRadius: 10
    }
});