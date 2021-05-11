import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LogginMiddleware from "../../components/Redux/03-middleware/LogginMiddleware";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { FancyAlert } from 'react-native-expo-fancy-alerts';

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
      <Image
        style={styles.logo}
        source={require("../../assets/ePlant_logo_signin.png")}
      />

            <TouchableOpacity onPress={() => navigate('Login')}>
                    <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
                </TouchableOpacity>
      <Input
        placeholder=" Email"
        type="text"
        required={true}
        inputStyle={styles.signintext}
        leftIcon={<Ionicons name="ios-mail" size={15} color="grey" />}
        onChangeText={(text) => setUserEmail(text)}
      />
      <Button
        title="Reset password"
        buttonStyle={styles.buttonsignin}
        onPress={ResetPass}
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
  forgotpassword: {
    fontSize: 10,
    fontWeight: "normal",
    textTransform: "uppercase",
    marginTop: 10,
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  notamember: {
    fontSize: 12,
    fontWeight: "normal",
    textTransform: "uppercase",
    marginTop: 20,
    letterSpacing: 0.5,
  },
  signintext: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  signuptext2: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  logo: {
    width: 306,
    height: 214,
  },
  buttonsignin: {
    backgroundColor: "#63816D",
    borderRadius: 3,
    marginRight: 3,
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
