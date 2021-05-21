import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LogginMiddleware from "../../components/Redux/03-middleware/LogginMiddleware";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
//import swal from 'sweetalert';

export default function Login(props) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = props.navigation.navigate;

  //console.log(props.navigation.state.params)

  /*if (props.navigation.state.params.swal) {
    swal("User and all user data is deleted!", {
      buttons: false,
      timer: 3000,
    });
  }*/
  
  const LogIn = () => {
    LogginMiddleware.LogIn(navigate, userEmail, userPassword);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    //console.log(passwordShown);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/ePlant_logo_signin.png")}
      />
      <Input
        placeholder=" Email"
        type="text"
        required={true}
        inputStyle={styles.signintext}
        leftIcon={<Ionicons name="ios-mail" size={15} color="grey" />}
        onChangeText={(text) => setUserEmail(text)}
      />
      <Input
        placeholder="Password"
        type={passwordShown ? "text" : "password"}
        required={true}
        secureTextEntry={true}
        inputStyle={styles.signintext}
        leftIcon={<MaterialIcons name="lock" size={18} color="grey" />}
        rightIcon={
          <Ionicons
            name="ios-eye"
            size={15}
            color="grey"
            onPress={togglePasswordVisiblity}
          />
        }
        onChangeText={(text) => setUserPassword(text)}
      />
      <Button
        title="Sign In"
        buttonStyle={styles.buttonsignin}
        onPress={LogIn}
      />
      <Text style={styles.notamember}>Not a member?</Text>

      <Text style={styles.signuptext2} onPress={() => navigate("Signup")}>
        Signup now
      </Text>
      <Text
        style={styles.forgotpassword}
        onPress={() => navigate("ResetPassword")}
      >
        Forgot your password?
      </Text>
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
