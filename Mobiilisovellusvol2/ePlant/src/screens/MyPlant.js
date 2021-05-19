import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import moment from "moment";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import setImage from "../components/SetImage"
import FireBasemiddleware from '../components/Redux/03-middleware/FireBasemiddleware';
import swal from 'sweetalert';

export default function MyPlant(props) {

    const [notifications, setNotifications] = useState("Loading...")
    const [updateDate, setUpdateDate] = useState("Loading...");

    let year = updateDate.slice(0, 4)
    let month = updateDate.slice(5, 7)
    let day = updateDate.slice(8, 10)
    let time = updateDate.slice(11, 19)

    const plant = props.navigation.state.params.plant[1];
    const plantID = props.navigation.state.params.plant[0];
    const channelId = plant.ePlantPot.channel_id;

    const [Field1, setField1] = useState({ 
        name: plant.ePlantPot.ePlantModel.Field1, 
        value: 0 
    });

    const [Field2, setField2] = useState({ 
        name: plant.ePlantPot.ePlantModel.Field2, 
        value: 0 
    });

    //console.log(plant)
    //console.log(Field1, Field2)
    
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
                    setField1({...Field1, value: responseJson.feeds[responseJson.feeds.length-1].field1});
                    setNotifications(responseJson.feeds)
                } else {
                    setField1({...Field1, value: 0})
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
                text: "Something went wrong while getting plant data",
             })
             console.log(error)
            });
    }

    const DeletePlant = () => {

        swal({
            title: "Delete plant?",
            text: "Are you sure?",
            icon: "warning",
            buttons: [true, "Do it!"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

              FireBasemiddleware.DeleteUserMyPlant(plantID, navigate);  

              swal("Poof! Plant deleted!", {
                icon: "success",
                timer: 1500,
              });
            } else {
              swal("Your plant is safe!", {
                button: "Close",
                timer: 1500,
              });
            }
          });
    }

    const NotificationMaker = () => {
        
        let lastTen = notifications.slice(notifications.length-11, notifications.length-1)
        console.log(lastTen)

        const timeParser = (date) => {
            
            let year = date.slice(0, 4)
            let month = date.slice(5, 7)
            let day = date.slice(8, 10)
            let time = date.slice(11, 19)

            return( day + "." + month + "." + year + " at: " +time)
        }
        return(
            <FlatList 
                data={lastTen}
                marginLeft={15}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <View >
                        <View>

                        <Image style={styles.circle} source={setImage(plant.species.toLowerCase())}/>
                        
                        </View>
                        <View >
                            <Text >{timeParser(item.created_at)}</Text>
                            <Text >{plant.plantName} values were updated</Text>
                            <Text >{Field1.name}: {item.field1}</Text>
                            <Text >{Field2.name}: {item.field2}</Text>
                        </View>
                    </View>
                }
            />
        )
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
                    <View style={styles.field1}>
                        <Text style={styles.field1Value}>{Field1.name}</Text>
                        <AnimatedCircularProgress
                        size={100}
                        width={10}
                        fill={Field1.value}
                        tintColor="#00e0ff"
                        //onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875">
                            {
                                (fill) => (
                                <Text>
                                   {Field1.value}
                                </Text>
                                )
                            }
                            </AnimatedCircularProgress>
                    </View>
                    <View style={styles.field2}>
                        <Text style={styles.field2Value}>{Field2.name}</Text>
                        <View>
                        <AnimatedCircularProgress
                        size={100}
                        width={10}
                        fill={Field2.value}
                        tintColor="#00e0ff"
                        //onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875">
                            {
                                (fill) => (
                                <Text>
                                   {Field2.value}
                                </Text>
                                )
                            }
                            </AnimatedCircularProgress>
                    </View>
                    </View>
                </View>
                <View>
                </View>

                <Text style={styles.value}>Values were updated in {day}.{month}.{year} at: {time} </Text>
            
                <Button
                buttonStyle={styles.btnmyplant}
                title= "Delete plant"
                onPress = {() => DeletePlant()}
                />
                <View style={styles.bottomheader}>
                    
                <Text style={styles.notifi}>Notifications</Text>

                {NotificationMaker()}
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
    phtext2: {
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
    
    notifi: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 15
    },
    
    
 

});