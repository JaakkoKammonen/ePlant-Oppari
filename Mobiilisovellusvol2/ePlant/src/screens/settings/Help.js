import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';

export default function Help(props) {
  // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

  const { navigate } = props.navigation;

  // returning plant data based on props from Search.js and plantImage from SetBackgroundImg.js
  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('Settings')}>
        <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
        </TouchableOpacity></View>
        <Image style={styles.avatar} source={require("../../assets/help.png")}/>
        <View style={styles.body}>
          <View style={styles.bodycontent}>
          <View style={styles.textwrapper}>
        <Text h4>Help</Text>
        <Text style={styles.info_text}>How do I get started?
        </Text>
        <Text style={styles.step_header}>STEP 1</Text>
        <Text style={styles.step_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.step_header}>STEP 2</Text>
        <Text style={styles.step_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.step_header}>STEP 3</Text>
        <Text style={styles.step_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.step_header}>STEP 4</Text>
        <Text style={styles.step_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.step_header}>DONE!</Text>
        <Text style={styles.step_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
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
  step_header: {
    marginTop: 15,
    fontWeight: "bold"
  },
  step_text: {
    marginTop: 5,
    fontSize: 13,
  },
});
