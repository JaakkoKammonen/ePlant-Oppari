import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from 'react-redux';

export default function SelectName(props) {
    
    const [plantName, setPlantName] = useState('');
    const { navigate } = props.navigation;
    const ePlantModels = useSelector(state => state.firebase.ePlantModels)
    //console.log(ePlantModels[0].Hydroponic)

    const handleSubmit = (eplantModel) => {
      // console.log(eplantModel)
       navigate("ePlantInputThingSpeakID", {ePlantModel:eplantModel, navigation:navigate})
    }

    const HydroponicsVersions = () => {
        //console.log(ePlantModels[0].Hydroponic)
        let hydroponic = ePlantModels[0].Hydroponic;

        let hydroponicVersions = Object.keys(hydroponic).map((item, i) =>{
            //console.log(hydroponic[item])
                return(
                    <View key={i}>
                <Card style={styles.card}>
                    <Card.Title>HYDRO</Card.Title>
                    <Card.Divider />
                    <Card.Image source={require("../../../assets/hydro.png")}
                    style={styles.hydro}
                    onPress={() =>  handleSubmit(hydroponic[item])}>
                    </Card.Image>
                </Card>
                    </View>
                )
            })
            //console.log(hydroponic)
        return hydroponicVersions
    }

    const SoilVersions = () => {
        //console.log(ePlantModels[0].Hydroponic)
        let soil = ePlantModels[1].Soil;

        let soilVersions = Object.keys(soil).map((item, i) =>{
            //console.log(hydroponic[item])
                return(
                    <View key={i}>
                    <Card>
                    <Card.Title>SOIL</Card.Title>
                    <Card.Divider />
                    <Card.Image source={require("../../../assets/soil.png")}
                        style={styles.soil}
                        onPress={() => handleSubmit(soil[item])}>
                    </Card.Image>
                </Card>
                    </View>
                )
            })
            //console.log(hydroponic)
        return soilVersions
    }

    return (
        <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => navigate("PlantOrPot")}>
                <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
                </TouchableOpacity>
                    <View>
                        <Text style={styles.title}>Add a new pot model</Text>
                    </View>
                    {HydroponicsVersions()}
                    {SoilVersions()}
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 3,
        marginBottom: 10
      },
    icon: {
        marginTop: "70%",
        marginRight:15,
        color: 'grey',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        shadowColor: "#DEDDDD",
        shadowOpacity: 2,
        shadowOffset: {
          height: 2,
          width: 2,
        },
        elevation: 4,
        backgroundColor: "#FAFAFA",
      },
      bottom: {
        marginLeft: 10,
        flex: 2,
        marginTop: 20,
      },
      bottom2: {
        fontSize: 14,
      },
      headertitle: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 48,
        marginBottom: 20,
      },
    title: {
        fontSize: 22,
        marginTop: 20,
        fontWeight: '600',
        marginBottom: 20,
        color: '#63816D',
        alignSelf: 'center'
    },
    text: {
        fontSize: 16,
        color: '#404040',
        alignSelf: 'center'
    },
    middleimage: {
        width: 200,
        height: 200,
        margin: 25,
        alignSelf: 'center'
    },
    textinput: {
        width: 350,
        alignSelf: 'center'
    },
    arrow: {
        marginLeft: 20,
        marginTop: 10,
        color: 'grey'
    },
    soil: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 35,
        marginRight: 50,
        width: 250,
        height: 195,
      },
     hydro: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 35,
        marginRight: 50,
        width: 200,
        height: 200,
      },
});