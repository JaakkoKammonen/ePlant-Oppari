import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';

export default function Info(props) {
  // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

  const { navigate } = props.navigation;

  // returning plant data based on props from Search.js and plantImage from SetBackgroundImg.js
  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('Settings')}>
        <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
        </TouchableOpacity></View>
        <Image style={styles.avatar} source={require("../../assets/info.png")}/>
        <View style={styles.body}>
          <View style={styles.bodycontent}>
          <View style={styles.textwrapper}>
        <Text h4>Info</Text>
        <Text style={styles.info_text}>ePlant is made for people who has a never ending curiosity to know how things work or for those who want 
        to save time and effort in growing plants.
        </Text>
        <Text style={styles.model_header}>SO WHAT IS IT ABOUT?</Text>
        <Text style={styles.model_text}>ePlant is an innovation that can make people's daily lives easier. It is an automated smart pot that 
        allows you to manage your plant data and specify its needs. You can also start the water pump manually from the plant's own screen
        if necessary. What about our application?
        Well, it allows you to create or choose a new pot and add a specific plant into it. 
        To complete your process you have to input your Thingspeak channel information so you can keep on track the current data. 
        Well how do I get started? It's easy! 
        Just follow the instructions (you can find the instructions on the settings). Before that take a look at the version options 
        below so you can choose the variation that suits your plant for the best.
        </Text>
        <Text style={styles.model_header}>SOIL MODEL</Text>
        <Text style={styles.model_text}>The soil model has a humidity sensor which measures soil moisture and sends data to the user in every hour.
        When the soil is too dry, the water pump will activate. It also has a water level sensor which measures the level of water in the outer 
        pot and activates the pump when the specified value has fallen. The soil and the plant itself are placed in the inner pot. 
        You can also add the plant to your existing pot by placing the sensors in the pot.
        </Text>
        <Text style={styles.model_header}>HYDRO MODEL</Text>
        <Text style={styles.model_text}>The hydro model has a pH-sensor which measures the pH of water and sends data to the user in every hour.
        It makes it possible to achieve an ideal growth environment for the plant. It also has a ppM-sensor which measures the amounts of minerals 
        and gasses dissolved in water. This model works with hydroponic so you don’t have to add soil at all. All nutrients can be dropped 
        directly into the water. It is suitable for 3D-modeling pots.
        </Text>
        <Text style={styles.question}>        
        So, what makes this pot great and different from other existing devices?
        This smart pot is connected to Wi-Fi, but also works stand-alone and it has two different variations: soil and hydro system.
        Say goobye to to exhausting plant care and join us! </Text>
        </View>
        <View style={styles.textwrapper}>
        <Text h4>Copyrights</Text>
        <Text style={styles.info_text}>© 2021 Jaakko Kammonen and Minna Kuivalainen</Text>
        <Text style={styles.copyrights}>All Rights Reserved</Text>
        </View>
        </View>
        </View>
        </ScrollView>
  );
}

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
    width: 120,
    height: 120,
    borderRadius: 58,
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
  },
  info_text: {
    marginTop: 10,
    fontSize: 13,
    marginBottom: 5
  },
  model_header: {
    marginTop: 15,
    fontWeight: "bold"
  },
  model_text: {
    marginTop: 5,
    fontSize: 13,
  },
  question: {
    marginTop: 20,
    fontStyle: "italic",
    fontSize: 13,
  },
  copyrights: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  }
});
