import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Input, Button, Card } from "react-native-elements";
import FireBasemiddleware from "../../components/Redux/03-middleware/FireBasemiddleware";

export default function Login(props) {

  // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

  const [ePlantPot, setEPlantPot] = useState({
    channel_id: props.navigation.state.params.ePlantPot.channel_id,
    write_apikey: props.navigation.state.params.ePlantPot.write_apikey,
    ePlantID: props.navigation.state.params.ePlantID,
  });
  const [new_ePlantPot, setNewEPlantPot] = useState({
    channel_id: props.navigation.state.params.ePlantPot.channel_id,
    write_apikey: props.navigation.state.params.ePlantPot.write_apikey,
    ePlantID: props.navigation.state.params.ePlantID,
  });

  const navigate = props.navigation.state.params.navigate;

  //console.log(props.navigation.state.params)
  //console.log(new_ePlantPot)

  const EditePlant = () => {
    FireBasemiddleware.ModifyUserEPlant(new_ePlantPot, navigate);
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigate("Settings")}>
        <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>Edit Pot Settings</Text>
      </View>
      <View style={styles.container2}>
        <Image
          style={styles.logo}
          source={require("../../assets/thingspeak.png")}
        />
        <View style={styles.currentdatawrapper}>
        <Text style={styles.currentchannel}> Current channel ID: <Text style={styles.currentchanneldata}>{ePlantPot.channel_id}</Text> </Text>
        <Text style={styles.currentapikey}> Current Write API-key: <Text style={styles.currentapikeydata}>{ePlantPot.write_apikey}</Text></Text>
        </View>
        <View style={styles.titlewrapper}>
          <Card.Title>EDIT CHANNEL ID</Card.Title>
        </View>
        <Input
          placeholder=" New Channel ID"
          type="text"
          required={true}
          inputStyle={styles.channelidinput}
          leftIcon={<AntDesign name="areachart" size={24} color="grey" />}
          onChangeText={(text) =>
            setNewEPlantPot({ ...new_ePlantPot, channel_id: text })
          }
        />
        <View style={styles.titlewrapper}>
          <Card.Title>EDIT WRITE API-KEY</Card.Title>
        </View>
        <Input
          placeholder=" New Write API-key"
          clearButtonMode="always"
          required={true}
          inputStyle={styles.apikeyinput}
          leftIcon={<MaterialIcons name="vpn-key" size={24} color="grey" />}
          onChangeText={(text) =>
            setNewEPlantPot({ ...new_ePlantPot, write_apikey: text })
          }
        />
        <View style={styles.buttonwrapper}>
          <Button
            title="Save"
            buttonStyle={styles.buttonthingspeak}
            onPress={() => EditePlant()}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 3,
    flex: 2,
  },
  arrow: {
    marginLeft: 20,
    marginTop: 10,
    color: "grey",
  },
  headerText: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#63816D",
    alignSelf: "center",
  },
  container2: {
    marginBottom: 3,
    padding: 50,
  },
  logo: {
    width: 260,
    height: 210,
  },
  currentdatawrapper: {
    alignItems: "center",
  },
  currentchannel: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  currentchanneldata: {
    fontSize: 13,
    fontWeight: "normal",
    letterSpacing: 0.5,
  },
  currentapikey: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginLeft: 33
  },
  currentapikeydata: {
    fontSize: 13,
    fontWeight: "normal",
    letterSpacing: 0.5,
    marginLeft: 33
  },
  titlewrapper: {
    marginTop: 20,
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
    height: 40,
  }
});
