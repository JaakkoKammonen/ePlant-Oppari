import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import FireBasemiddleware from '../../../components/Redux/03-middleware/FireBasemiddleware';

export default function SelectName(props) {

    // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

    const navigate = props.navigation.state.params.navigation;

    const [ePlant, setePlant] = useState({
        ePlantName: "",
        channel_id: 0,
        write_apikey: "",
        ePlantModel: props.navigation.state.params.ePlantModel
    });
    const userUid = useSelector(item => item.user.uid)
    //console.log(user)
    const handleSubmit = (event) => {

        event.preventDefault();

        FireBasemiddleware.AddePlantToUser(userUid,ePlant, navigate)
    }
    //console.log(props.navigation.state.params)

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigate("SelectePlantModel")}>
                <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
                </TouchableOpacity>
                    <View>
                        <Text style={styles.headerText}>Input ThingSpeak Information</Text>
                    </View>
            <View style={styles.container2}>
            <Image
        style={styles.logo}
        source={require("../../../assets/thingspeak.png")}
        />
        <View style={styles.titlewrapper}>
            <Card.Title>Name your ePlant!</Card.Title>
            </View>
            <Input
                    placeholder=" Eve, John etc."
                    type="text"
                    required={true}
                    inputStyle={styles.channelidinput}
                    leftIcon={<AntDesign name="areachart" size={24} color="grey" />}
                    onChangeText={text => setePlant({
                                    ...ePlant, ePlantName: text})}
                                returnKeyType='done'
                />
                 <View style={styles.titlewrapper}>

            <Card.Title>THINGSPEAK CHANNEL ID</Card.Title>
            </View>
            <Input
                    placeholder=" Channel ID"
                    type="text"
                    required={true}
                    inputStyle={styles.channelidinput}
                    leftIcon={<AntDesign name="areachart" size={24} color="grey" />}
                    onChangeText={text => setePlant({
                                    ...ePlant, channel_id: text})}
                                returnKeyType='done'
                />

                   <View style={styles.titlewrapper}>
               <Card.Title>THINGSPEAK WRITE API-KEY</Card.Title>
               </View>
                <Input
                    placeholder=" API-key"
                    required={true}
                    clearButtonMode='always'
                    inputStyle={styles.apikeyinput}
                    leftIcon={<MaterialIcons name="vpn-key" size={24} color="grey" />}
                    onChangeText={text => setePlant({
                                ...ePlant, write_apikey: text})}
                />
                <View style={styles.buttonwrapper}>
                <Button
                    title="Let's go!"
                    buttonStyle={styles.buttonthingspeak}
                    onPress={ () => handleSubmit(event)}
                />
                </View>
                </View>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 3,
        flex: 2,
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
    container2: {
        marginBottom: 3,
        padding: 50,
    },
    logo: {
        width: 260,
        height: 210,
    },
    titlewrapper: {
        marginTop: 20
    },
    channelidinput: {
      fontSize: 12,
      fontWeight: "normal",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    apikeyinput: {
      fontSize: 12,
      fontWeight: "normal",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    buttonwrapper: {
      alignItems: "center",
    },
    buttonthingspeak: {
        backgroundColor: "#63816D",
        borderRadius: 3,
        marginTop: 10,
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        width: 100,
        height: 40
    },
});