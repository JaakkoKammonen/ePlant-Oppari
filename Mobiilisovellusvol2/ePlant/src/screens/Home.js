import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { FlatList } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import Firebase from "../components/Redux/03-middleware/FireBasemiddleware"

export default function Home(props) {

    const dispatch = useDispatch();

    let plants = useSelector(state => state.firebase.myPlants)

    const user = "Jace";
    
    
    const [visibility, setVisibility] = useState(false);
    const { navigate } = props.navigation;

    // use these variables if they have all these props (so if user has navigated to Koti.js from SelectName.js)
    const showSnackbar = props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.showSnackbar
    const plantName = props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.plantName
    //console.log(plants)
    // change snackbar visibility opposite to current status
    const toggleSnackBar = () => setVisibility(!visibility);
    
    // retrieving firebase data and inserting it to "plants" list
    useEffect(() => {
    Firebase.UpdateMyPlants(dispatch);
    Firebase.UpdatePlants(dispatch);
    Firebase.UpdatePots(dispatch);

        if (showSnackbar === true) {
            toggleSnackBar();
        }
    }, []);

    // sending selected items data to next screen and navigating to there
    const handleSelect = (item) => {
        //console.log(item)
        navigate('MyPlant', { plant: item })
    };

    return (
        <View style={styles.container}>    
            <SafeAreaView>
                <View style={styles.top} >
                    <Text style={styles.toptext}>Huomenta {user}!</Text>
                </View>
                <View style={styles.middle}>
                    <View style={styles.middleheader}>
                        <Text style={styles.header}>Omat kasvini</Text>
                    </View>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={plants}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={styles.border}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.middletext}>{item.nimi}</Text>
                                <Image style={styles.middleimage} source={require('../assets/herbs.png')} />
                            </TouchableOpacity>
                        }
                    />
                </View>
                </SafeAreaView>
                <View style={styles.bottomheader}>
                    <Text style={styles.header2}>Viimeisimmät tapahtumat</Text>
                    <TouchableOpacity
                        onPress={() => navigate('Notifications', { plants })}
                    >
                        <Text style={styles.showmore}>Näytä lisää</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
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
                                    <Text style={styles.bottomtext2}>{item.nimi} kasteltu.</Text>
                                </View>
                            </View>
                        }
                    />
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
                    {plantName} lisätty omiin kasveihin!
                </Snackbar>
            </View>
        </View>
    );
};


Home.navigationOptions = () => ({ title: 'Home' });

const styles = StyleSheet.create({
    button: {
        paddingBottom: 20
    },
    container: {
        backgroundColor: '#FCFCFC',
        flex: 2,
    },
    top: {
        marginLeft: 10,
        flex: 1,
        marginTop: 40,
        marginBottom: 30
    },
    toptext: {
        fontSize: 26,
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
        height: 150
    },
    bottomheader: {
        justifyContent:"space-between",
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 30
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