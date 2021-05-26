import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from 'react-redux';

export default function SelectName(props) {

    // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //
    
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
                <Card>
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
    hydro: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 35,
        marginRight: 50,
        width: 200,
        height: 200,
    },
    soil: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 35,
        marginRight: 50,
        width: 250,
        height: 195,
    },
    container: {
        flex: 2,
        padding: 3,
        marginBottom: 10
    },
    arrow: {
        marginLeft: 20,
        marginTop: 10,
        color: 'grey'
    },
    title: {
        fontSize: 22,
        marginTop: 20,
        fontWeight: '600',
        marginBottom: 20,
        color: '#63816D',
        alignSelf: 'center'
    },
});