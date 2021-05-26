import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import Firebase from "../components/Redux/03-middleware/FireBasemiddleware"
import LogginMiddleware from '../components/Redux/03-middleware/LogginMiddleware';
import setImage from "../components/SetImage";

export default function Home(props) {
    
    // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    const allNotifications = useSelector(state => state.firebase.notification).slice().sort((a, b) => new Date(b.time) - new  Date(a.time));

    const [visibility, setVisibility] = useState(false);
    const [notifications, setNotifications] = useState("Loading...")

    const { navigate } = props.navigation;
    let plants;
    if (useSelector(state => state.firebase.my_Plants) === "No plants yet") {
        plants = useSelector(state => state.firebase.my_Plants)
    } else {
        plants = useSelector(state => Object.entries(state.firebase.my_Plants))
    }
     
    // use these variables if they have all these props (so if user has navigated to Koti.js from SelectName.js)
    const showSnackbar = props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.showSnackbar
    const plantName = props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.plantName

    // change snackbar visibility opposite to current status
    const toggleSnackBar = () => setVisibility(!visibility);

    

    useEffect(() => {
    LogginMiddleware.CheckIfLoggedIn(navigate);
    LogginMiddleware.UpdateUserData(dispatch)
    Firebase.UpdatePlants(dispatch);
    Firebase.UpdateEPlantModels(dispatch);
 
        if (showSnackbar === true) {
            toggleSnackBar();
        }

    Firebase.UpdateMyePlantPots(dispatch);
    Firebase.UpdateMyPlants(dispatch);
    }, []);

    // sending selected items data to next screen and navigating to there
    const handleSelect = (item) => {
        //console.log(item)
        navigate('MyPlant', { plant: item })
    };


    const PlantsRender = () => {
            if (plants === "No plants yet") {
                return(
                    <View>
                    <Image style={styles.noplants} source={require('../assets/oops2.png')} />
                    </View>
                )
            }   else {
                return(
                    <FlatList
                    horizontal={true}
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={plants}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        
                        <TouchableOpacity 
                        style={styles.border}
                        onPress={() => handleSelect(item)}
                        >
                            <Image style={styles.middleimage} source={setImage(item[1].species.toLowerCase())} />
                            <View style={styles.text_container}>
                            <Text style={styles.middletext}>{item[1].plantName}</Text>
                        </View>
                        </TouchableOpacity>
                    }
                />
                )
            }
        }


    const timeParser = (date) => {
            
            let year = date.slice(0, 4)
            let month = date.slice(5, 7)
            let day = date.slice(8, 10)
            let time = date.slice(11, 19)

            return( day + "." + month + "." + year + " at: " +time)
        }


    const NotificationsRender = () => {

        if (plants === "No plants yet") {
            return(
                <View>
                    <Text style={styles.nonotifications}>
                    No notifications yet
                    </Text>
                </View>
            )
        } else {

            return(
                <FlatList data={allNotifications}
                marginLeft={15}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                <View style={styles.bottomitem}>
                    <View>

                    <Image style={styles.circle} source={setImage(item.imagesrc.toLowerCase())}/>
                    
                    </View>
                    <View >
                    <View style={styles.bottomtext}>
                        <Text style={styles.bottomtext1}>{timeParser(item.time)}</Text>
                        <Text style={styles.fieldname}>{item.plantname}'s value were updated</Text>
                        <Text style={styles.field01}>{item.field1Name}:<Text style={styles.field01value}> {item.field1Value}</Text></Text>
                        <Text style={styles.field02}>{item.field2Name}: <Text style={styles.field01value}> {item.field2Value}</Text></Text>
                        </View>
                    </View>
                </View>
                }
            />
            )

        }
    }
    return (
        <View style={styles.container}>    
                    <Text style={styles.toptext}>Howdy {user.displayName}!</Text>
                <View style={styles.middle}>
                    <View style={styles.middleheader}>
                        <Text style={styles.header}>My plants</Text>
                    </View>

                    {PlantsRender()}

                </View>
                <View style={styles.bottomheader}>
                    <Text style={styles.header2}>Notifications</Text>
                    <TouchableOpacity
                        onPress={() => navigate('Notifications', { plants })}
                    >
                        <Text style={styles.showmore}>Show more</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
                   
                   {NotificationsRender()}
                   
                </View>
            <View>
                <Snackbar
                    visible={visibility}
                    onDismiss={toggleSnackBar}
                    theme={{ colors: { accent: '#63816D' }}}
                    style={{
                        backgroundColor: '#404040',
                        
                    }}
                    action={{
                        label: 'SULJE',
                        onPress: () => {toggleSnackBar},
                    }}
                >
                    {plantName}
                </Snackbar>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    noplants: {
        width: 220,
        height: 220,
        marginLeft: 70,
        marginRight: 50,
        marginBottom: 15,
    },
    border: {
        elevation: 3, // android
        borderRadius: 4,
        margin:5,
        height: 187,
        width: 170,
        marginTop: 10,
        backgroundColor: 'white',
    },
    middleimage: {
        width: 172,
        height: 187,
        borderRadius: 6
    },
    text_container:{
        position: "absolute",
        width: 170,
        height: 30,
        bottom:0,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderBottomLeftRadius : 4,
        borderBottomRightRadius: 4
    },
    middletext: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 3,
        color: "white",
        fontWeight: 'normal'
    },
    nonotifications: {
        fontSize: 14,
        fontWeight: 'normal',
        marginLeft: 10,
        marginBottom: 15
    },
    bottomitem: {
        flexDirection: "row",
        marginBottom: 5,
        marginTop: 10
    },
    circle: {
        width: 40,
        height: 40,
        marginTop: 10,
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
        fontWeight: 'bold'
    },
    fieldname: {
        marginLeft: 5,
        fontSize: 16
    },
    field01: {
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 4,
    },
    field01value: {
        fontSize: 10,
        fontWeight: "normal",
        marginLeft: 3,
    },
    field02: {
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 4,
    },
    field02value: {
        fontSize: 10,
        fontWeight: "normal",
        marginLeft: 3,
    },
    container: {
        flex: 2,
        padding: 3,
    },
    toptext: {
        fontSize: 26,
        marginTop: 20,
        marginLeft: 10,
        marginBottom: 20,
    },
    middle: {
        flex: 1.5,
        shadowColor: "#000",
    },
    middleheader: {
        justifyContent:"space-between",
        flexDirection: 'row',
    },
    header: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 15
    },
    bottomheader: {
        justifyContent:"space-between",
        flexDirection: 'row',
        marginLeft: 10,
    },
    header2: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 15
    },
    showmore: {
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
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // android
        backgroundColor: '#fbfbfb',
        borderRadius: 8
    }
});