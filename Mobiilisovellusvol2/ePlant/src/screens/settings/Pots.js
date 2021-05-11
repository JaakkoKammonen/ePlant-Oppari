import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import FireBasemiddleware from '../../components/Redux/03-middleware/FireBasemiddleware';

export default function Pots(props) {
    const { navigate } = props.navigation;

    let ePlantPots = useSelector(state => state.firebase.my_ePlants)
    //console.log(ePlantPots)

    const DeletePot = ( ePlantID) => {

    FireBasemiddleware.DeleteUserEPlant(ePlantID)

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
                            <Text>{ePlantPots[item].ePlantModel.type} </Text>
                            <Text>Version: {ePlantPots[item].ePlantModel.version} </Text>
                            <Text>{ePlantPots[item].channel_id} </Text>
                            <Text style= {{paddingBottom:10}}>{ePlantPots[item].write_apikey} </Text>

                            <Button
                            title="Edit"
                            onPress={() => ModifyePlant(item)}
                            />
                             <Button
                            title="Delete"
                            onPress={() => DeletePot(item)}
                            />

                        </View>
                    )
                })
                
                return pots
        } else {
            return(
            <View>
                <Text>
                    No ePlants yet
                </Text>
            </View> 
            )
        }
    }
    // returning plant data based on props from Search.js and plantImage from SetBackgroundImg.js
    return (
        <ScrollView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigate('Settings')}>
                    <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
                </TouchableOpacity>
                <Text style={styles.description}>Your ePlants</Text>
                    {ePlants()}
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
    description: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        fontSize: 14
    },
    arrow: {
        marginLeft: 20,
        marginTop: 10,
        color: 'grey'
    }
});