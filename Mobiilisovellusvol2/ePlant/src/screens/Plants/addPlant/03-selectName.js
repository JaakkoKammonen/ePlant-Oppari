import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Card } from 'react-native-elements';
import FireBase from "../../../components/Redux/03-middleware/FireBasemiddleware";
import { useSelector } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";

export default function SelectName(props) {

    // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //
    
    const [plantName, setPlantName] = useState('');
    const { navigate } = props.navigation;
    let species = props.navigation.state.params.plant;
    let ePlant = props.navigation.state.params.eplant
    let my_Plants = useSelector(state => state.firebase.my_Plants)
    let userUid = useSelector(state => state.user.uid)

   const AddPlantDb = (event) => {
     event.preventDefault();
     FireBase.AddPlantToUser(userUid,species,plantName, ePlant, navigate)
   }

    return (
        <ScrollView style={styles.container}>
              <TouchableOpacity onPress={() => navigate("SelectPlant")}>
                <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
                </TouchableOpacity>
                    <View>
                        <Text style={styles.headerText}>Add a new plant</Text>
                    </View>
            <KeyboardAvoidingView
                behavior={'padding'}
                style={styles.keyboard}
            >
                    <View style={styles.textwrapper}>
                    <Card.Title>ALMOST DONE!</Card.Title>
                        <Text style={styles.text}>Now, give your plant a name</Text>
                    </View>
                    <Image style={styles.middleimage} source={require("../../../assets/done_pot.png")}/>
                    <View style={styles.inputstyle}>
                    <Input
                        placeholder='Name it'
                        inputStyle={styles.textinput}
                        clearButtonMode='always'
                        onChangeText={text => setPlantName(text)}
                        returnKeyType='done'
                        onSubmitEditing={AddPlantDb}
                    />
                    </View>
            </KeyboardAvoidingView>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    arrow: {
        marginLeft: 20,
        marginTop: 10,
        color: 'grey'
    },
    headerText: {
        fontSize: 22,
        marginTop: 20,
        fontWeight: '600',
        marginBottom: 20,
        color: '#63816D',
        alignSelf: 'center'
    },
    keyboard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textwrapper: {
        marginTop: 20
    },
    text: {
        fontSize: 14,
        color: '#404040',
        alignSelf: 'center',
        marginBottom: 20
    },
    middleimage: {
        width: 200,
        height: 250,
        margin: 25,
        alignSelf: 'center'
    },
    inputstyle: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
    textinput: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    }
});