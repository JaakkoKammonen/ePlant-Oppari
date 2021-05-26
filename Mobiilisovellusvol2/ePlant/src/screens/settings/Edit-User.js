import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import LogginMiddleware from "../../components/Redux/03-middleware/LogginMiddleware";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";

export default function Login(props) {

  // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

  const [user, setUser] = useState({
    displayName: props.navigation.state.params.user.displayName
  });

  const [new_user, setNewUser] = useState({
    displayName: props.navigation.state.params.user.displayName
  });

  const navigate = props.navigation.state.params.navigate

  //console.log(props.navigation.state.params.user)
  
  const EditUser = () => {
    LogginMiddleware.ModifyUser(new_user, navigate)
  }
  return (
    <ScrollView style={styles.container}>
     <View style={styles.header}>
    <TouchableOpacity onPress={() => navigate("User")}>
        <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
        </TouchableOpacity>
        </View>
    <Image style={styles.avatar} source={require("../../assets/userprofile.png")}/>
    <View style={styles.body}>
              <View style={styles.bodycontent}>
              <View>
        <Text style={styles.headerText}>Edit Username</Text>
      </View>
    <Text style={styles.currentname}>Current name: <Text style={styles.currentnamedata}>{user.displayName}</Text></Text>
       <View style={styles.inputstyle}>
        <Input
            placeholder=" New username"
            required={true}
            clearButtonMode='always'
            inputStyle={styles.editname}
            leftIcon={<MaterialIcons name="person" size={24} color="grey" />}
            onChangeText={(text) => setNewUser({...new_user, displayName: text})}
        />
        </View>
        <View style={styles.buttonwrapper}>
        <Button
            title="Save"
            buttonStyle={styles.buttonedituser}
            onPress={() => EditUser()}
        />
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
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  body:{
    marginTop: 40,
  },
  bodycontent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  headerText: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#63816D",
    alignSelf: "center",
  },
  currentname: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  currentnamedata: {
    fontSize: 13,
    fontWeight: "normal",
    letterSpacing: 0.5,
  },
  inputstyle: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  },
  editname: {
    fontSize: 12,
    fontWeight: "normal",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  buttonwrapper: {
    alignItems: "center",
  },
  buttonedituser: {
    backgroundColor: "#63816D",
    borderRadius: 3,
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    width: 100,
    height: 40
  }
});