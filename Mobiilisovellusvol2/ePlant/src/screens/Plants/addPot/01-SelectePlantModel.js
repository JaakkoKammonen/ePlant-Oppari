import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Button } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';

export default function SelectName(props) {
    
    const [plantName, setPlantName] = useState('');
    const { navigate } = props.navigation;
    const ePlantModels = useSelector(state => state.firebase.ePlantModels)
    //console.log(ePlantModels)

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={{width:"14%"}}></Text>
                <Text style={styles.headertitle}>Add new plant pot</Text>
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
                    <Button
                    title={ePlantModels[0].Hydroponic.Version1.hydroponic}
                    onPress={navigate("ePlantInputThingSpeakID", {navigation:{navigate},  } )}>
                    </Button>

                    <Button
                    title={ePlantModels[1].Soil.Version1.soil}
                    onPress={navigate("ePlantInputThingSpeakID", {navigation:{navigate}, } )}>
                    </Button>
                   
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