import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LogginMiddleware from "../../components/Redux/03-middleware/LogginMiddleware";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import FireBasemiddleware from "../../components/Redux/03-middleware/FireBasemiddleware";

export default function Login(props) {
  const [ePlantPot, setEPlantPot] = useState({
    channel_id: props.navigation.state.params.ePlantPot.channel_id,
    write_apikey:props.navigation.state.params.ePlantPot.write_apikey,
    ePlantID: props.navigation.state.params.ePlantID
  });
  const [new_ePlantPot, setNewEPlantPot] = useState({
    channel_id: props.navigation.state.params.ePlantPot.channel_id,
    write_apikey:props.navigation.state.params.ePlantPot.write_apikey,
    ePlantID: props.navigation.state.params.ePlantID
  });

  const navigate = props.navigation.state.params.navigate

  //console.log(props.navigation.state.params)
  //console.log(new_ePlantPot)
  
  const EditePlant = () => {
    FireBasemiddleware.ModifyUserEPlant(new_ePlantPot, navigate)
  }
  return (
    <View style={styles.container}>

    <TouchableOpacity onPress={() => navigate('Settings')}>
        <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
    </TouchableOpacity>

    <Text>
        Now your channel id is: {ePlantPot.channel_id}
    </Text>
      <Input
        placeholder="New channel id"
        type="text"
        required={true}
        inputStyle={styles.signintext}
        onChangeText={(text) => setNewEPlantPot({...new_ePlantPot, channel_id: text})}
      />

    <Text>
        Now your write_apikey is: {ePlantPot.write_apikey}
    </Text>
      <Input
        placeholder="New write_apikey"
        required={true}
        inputStyle={styles.signintext}
        onChangeText={ (text) => setNewEPlantPot({...new_ePlantPot, write_apikey: text})}
      />
    
    <Button
    title= "Edit"
    onPress={() => EditePlant()}
    />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    alignItems: "center",
  },
  
});
