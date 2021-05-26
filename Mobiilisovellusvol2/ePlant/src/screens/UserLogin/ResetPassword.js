import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import LogginMiddleware from "../../components/Redux/03-middleware/LogginMiddleware";
import { Ionicons } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";

export default function ResetPassword(props) {
  const [userEmail, setUserEmail] = useState("");
  const navigate = props.navigation.navigate;

  //console.log(props.navigation.state.params.errorAlert.title)

  const ResetPass = (event) => {
    event.preventDefault();
    LogginMiddleware.ResetPasswordSendEmail(userEmail);
    navigate("Login")
  }
  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={() => navigate("Login")}>
        <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={require("../../assets/ePlant_logo_signin.png")}
      />
      <View style={styles.bodycontainer}>
      <Input
        placeholder=" Email"
        type="text"
        required={true}
        inputStyle={styles.resetpassword}
        leftIcon={<Ionicons name="ios-mail" size={15} color="grey" />}
        onChangeText={(text) => setUserEmail(text)}
      />
       <View style={styles.buttoncontainer}>
      <Button
        title="Reset password"
        buttonStyle={styles.buttonpassword}
        onPress={ResetPass}
      />
      </View>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 3,
    marginBottom: 10,
  },
  resetpassword: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  logo: {
    width: 306,
    height: 214,
    alignSelf: 'center',
  },
  bodycontainer: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  buttonpassword: {
    backgroundColor: "#63816D",
    borderRadius: 3,
    marginRight: 3,
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    alignItems: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  arrow: {
    marginLeft: 20,
    marginTop: 10,
    color: 'grey'
  },
  buttoncontainer: {
    marginTop: 10,
    width: 100,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});
