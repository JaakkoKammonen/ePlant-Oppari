import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Button } from 'react-native';
import { Input, Icon } from 'react-native-elements';
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
                        
                        <Text >
                            Version: {hydroponic[item].version}
                        </Text> 
                        <Text >
                            Type: {hydroponic[item].type}
                        </Text> 
                        <Button 
                        title={"Submit"}
                        style={{paddingBottom: 10}}
                        onPress={() => handleSubmit(hydroponic[item])}
                        />
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
                        <Text>
                            Version: {soil[item].version}
                        </Text> 
                        <Text>
                            Type: {soil[item].type}
                        </Text> 
                        <Button 
                        title={"Submit"}
                        style={{paddingBottom: 10}}
                        onPress={() => handleSubmit(soil[item])}
                        />
                    </View>
                )
            })
            //console.log(hydroponic)
        return soilVersions
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={{width:"14%"}}></Text>
                <Text style={styles.headertitle}>Select your ePlant model</Text>
                <Icon 
                    name="close" 
                    size={40} 
                    iconStyle={styles.icon}
                    onPress={() => navigate('Home')} 
                />
            </View>
            <KeyboardAvoidingView
                behavior={'padding'}
                style={styles.container}
            >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Select your ePlant model</Text>
                        
                    </View>

                    {HydroponicsVersions()}
                    {SoilVersions()}
                
                   
                </View>
            </KeyboardAvoidingView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        flexDirection:"row",
        justifyContent:"space-between",
    },
    headertitle: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: "11%",
        paddingBottom: 20,
    },
    title: {
        fontSize: 22,
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
    }

});