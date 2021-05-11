import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import Firebase from "../components/Redux/03-middleware/FireBasemiddleware"
import LogginMiddleware from '../components/Redux/03-middleware/LogginMiddleware';
import setImage from "../components/SetImage" 
export default function Home(props) {

    const dispatch = useDispatch();

    let plants = useSelector(state => state.firebase.my_Plants)
    const user = useSelector(state => state.user)
    //console.log(user.uid)

    const [visibility, setVisibility] = useState(false);
    const { navigate } = props.navigation;

    // use these variables if they have all these props (so if user has navigated to Koti.js from SelectName.js)
    const showSnackbar = props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.showSnackbar
    const plantName = props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.plantName
    //console.log(plants)
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
                        <Text>
                        No plants yet    
                        </Text>
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
                            <Text style={styles.middletext}>{item.plantName}</Text>
                            <Image style={styles.middleimage} source={setImage(item.species.toLowerCase())} />
                        </TouchableOpacity>
                    }
                />
                )
            }
        }


    const NotificationsRender = () => {
        if (plants === "No plants yet") {
            return(
                <View>
                    <Text>
                    No notifications yet    
                    </Text>
                </View>
            )
        }   else {
            return(
                <FlatList data={plants}
                marginLeft={15}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <View style={styles.bottomitem}>
                        <View>
                           <View style={styles.circle}/>
                        </View>
                        <View style={styles.bottomtext}>
                            <Text style={styles.bottomtext1}>Tänään klo 8.20</Text>
                            <Text style={styles.bottomtext2}>{item.plantName} kasteltu.</Text>
                        </View>
                    </View>
                }
            />
            )

        }
    }
    return (
        <View style={styles.container}>    
                <View style={styles.top} >
                    <Text style={styles.toptext}>Howdy {user.displayName}!</Text>
                </View>
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
                    {plantName} added!
                </Snackbar>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    button: {
        paddingBottom: 20
    },
    container: {
        backgroundColor: '#FCFCFC',
        flex: 2,
        padding: 3,
    },
    top: {
        marginLeft: 10,
        flex: 1,
        marginTop: 70,
    },
    toptext: {
        fontSize: 26
    },
    middle: {
        flex: 2,
        shadowColor: "#000",
    },
    middletext: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 10,
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
    header2: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 15
    },
    border: {
        shadowOffset: { height: 3, width: 2 }, // IOS
        shadowOpacity: 3, // IOS
        shadowColor: '#A9A9A9',
        shadowRadius: 1, //IOS
        elevation: 3, // android
        borderRadius: 4,
        margin:5,
        height: 185,
        width: 170,
        marginTop: 10,
        backgroundColor: 'white',
    },
    middletext: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold'
    },
    middleimage: {
        width: 150,
        height: 150,
    },
    bottomheader: {
        justifyContent:"space-between",
        flexDirection: 'row',
        marginLeft: 10,
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
        fontWeight: 'bold'
    },
    bottomtext2: {
        marginLeft: 5,
        fontSize: 16
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 100/2,
        backgroundColor: '#eaaf7e'
    },
});