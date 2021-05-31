import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import FireBasemiddleware from '../../components/Redux/03-middleware/FireBasemiddleware';
import swal from 'sweetalert';

export default function Pots(props) {

    // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

    const { navigate } = props.navigation;

    let ePlantPots = useSelector(state => state.firebase.my_ePlants)
    //console.log(ePlantPots)

    const DeletePot = ( ePlantID) => {

            swal({
                title: "Delete pot?",
                text: "Are you sure?",
                icon: "error",
                buttons: [true, "Do it!"],
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {

            FireBasemiddleware.DeleteUserEPlant(ePlantID, navigate)

            
            } else {
            swal("Your pot is safe!", {
                button: "Close",
                timer: 2000,
            });
            }
        });
        }


    const ModifyePlant = (ePlantID) => {
        navigate("EditUserEPlant", {ePlantPot:ePlantPots[ePlantID], ePlantID: ePlantID, navigate: navigate});
    }
    const ePlants = () => {
        if(ePlantPots !== "No ePlants yet") {
       let pots = Object.keys(ePlantPots).map((item, i) => {
            //console.log(ePlantPots[item])
            //console.log(item)
                    return(
                        <View key={i}>
                        <Card>
                            <Card.Title>POT</Card.Title>
                            <Card.Divider />
                            <Card.Image source={require("../../assets/selectpot.png")} style={styles.potimage}/>
                            <Text style={styles.modeltype}>Model: <Text style={styles.modeldata}>{ePlantPots[item].ePlantModel.type}</Text> </Text>
                            <Text style={styles.pname}>Name: <Text style={styles.pdata}>{ePlantPots[item].ePlantName}</Text> </Text>
                            <Text style={styles.version}>Version: <Text style={styles.versiondata}>{ePlantPots[item].ePlantModel.version}</Text></Text>
                            <Text style={styles.channel}>Channel ID: <Text style={styles.channeldata}>{ePlantPots[item].channel_id}</Text> </Text>
                            <Text style={styles.apikey}>API key: <Text style={styles.apidata}>{ePlantPots[item].write_apikey}</Text> </Text>
                            <View style={styles.buttonwrapper}>
                            <Button
                            title="Edit"
                            buttonStyle={styles.buttonpot}
                            onPress={() => ModifyePlant(item)}
                            />
                             <Button
                            title="Delete"
                            buttonStyle={styles.buttonpot}
                            onPress={() => DeletePot(item)}
                            />
                            </View>
                            </Card>
                        </View>
                    )
                })
                
                return pots
        } else {
            return(
            <View>
                <Text style={styles.noplantsyet}>
                    No pots yet
                </Text>
            </View> 
            )
        }
    }
    // returning plant data based on props from Search.js and plantImage from SetBackgroundImg.js
    return (
        <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => navigate('Settings')}>
                    <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
                </TouchableOpacity>
                <Text style={styles.description}>Your ePlant pots</Text>
                    {ePlants()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    potimage: {
        width: 172,
        height: 187,
        marginLeft: 60,
        marginRight: 50
    },
    modeltype: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 20,
        marginLeft: 20,
        letterSpacing: 0.5,
    },
    modeldata: {
        fontSize: 15,
        fontWeight: "normal",
        marginTop: 20,
        marginLeft: 5,
        letterSpacing: 0.5,
    },
    pname: {
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 20,
        letterSpacing: 0.5,
    },
    pdata: {
        fontSize: 15,
        fontWeight: "normal",
        marginTop: 20,
        marginLeft: 5,
        letterSpacing: 0.5,
    },
    version: {
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 0.5,
        marginLeft: 20,
    },
    versiondata: {
        fontSize: 15,
        fontWeight: "normal",
        letterSpacing: 0.5,
        marginLeft: 5,
    },
    channel: {
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 0.5,
        marginLeft: 20,
    },
    channeldata: {
        fontSize: 15,
        fontWeight: "normal",
        letterSpacing: 0.5,
        marginLeft: 5,
    },
    apikey: {
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 0.5,
        marginLeft: 20,
        marginBottom: 20
    },
    apidata: {
        fontSize: 15,
        fontWeight: "normal",
        letterSpacing: 0.5,
        marginLeft: 5,
        marginBottom: 20
    },
    buttonwrapper: {
        marginLeft: 100,
        marginRight: 100,
    },
    buttonpot: {
        backgroundColor: "#63816D",
        borderRadius: 10,
        padding: 5,
        marginTop: 10,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        width: 90,
        height: 30
    },
    noplantsyet: {
        fontSize: 14,
        fontWeight: 'normal',
        marginLeft: 10,
        marginBottom: 15
    },
    container: {
        flex: 2,
        padding: 3,
        marginBottom: 5,
    },
    arrow: {
        marginLeft: 20,
        marginTop: 10,
        color: 'grey'
    },
    description: {
        fontSize: 22,
        marginTop: 20,
        fontWeight: '600',
        marginBottom: 20,
        color: '#63816D',
        alignSelf: 'center'
    }
});