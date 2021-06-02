import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';

export default function Safety(props) {

    // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

    const { navigate } = props.navigation;

    // returning plant data based on props from Search.js and plantImage from SetBackgroundImg.js
    return (
        <ScrollView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('Settings')}>
                <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
            </TouchableOpacity></View>
        <Image style={styles.avatar} source={require("../../assets/safety1.png")}/>
        <View style={styles.body}>
          <View style={styles.bodycontent}>
          <View style={styles.textwrapper}>
        <Text h4>Privacy Policy</Text>
        <Text>When registering on our app, as appropriate, you may be asked to enter your name, email address or other details 
        so that we can provide our services to you.</Text>
        </View>
        <View style={styles.textwrapper}>
        <Text h4>Firebase</Text>
        <Text>We use firebase as a database that stores user information and plant / pot information. 
        The user is able to manage their own plants and pots by logging in.</Text>
        </View>
        <View style={styles.textwrapper}>
        <Text h4>ThingSpeak</Text>
        <Text>Thingspeak is an open platform that allows you to aggregate, visualize, and analyze live data streams in the cloud. The values ​​are 
        visible to all ThingSpeak users. With authentication, only the user can edit their channel information. We use data from the pot 
        to measure water pH and ppm values ​​(in hydro version) or soil moisture and water level (in soil version). The user can read data 
        from thingspeak.com or directly from the application on their own plant's screen.</Text>
        </View>
        </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        shadowColor: "#DEDDDD",
        backgroundColor: "#FAFAFA",
        shadowOpacity: 2,
        shadowOffset: {
            height: 1,
            width: 1,
          },
        height:200,
      },
      arrow: {
        marginLeft: 20,
        marginTop: 10,
        color: 'grey'
    },
      avatar: {
        width: 130,
        height: 120,
        borderRadius: 60,
        borderColor: "white",
        borderWidth: 4,
        marginBottom: 10,
        alignSelf:'center',
        position: 'absolute',
        marginTop: 130
      },
      body:{
        marginTop: 40,
      },
      bodycontent: {
        flex: 1,
        alignItems: 'left',
        padding:30,
      },
      textwrapper: {
        margin: 10
      }
});