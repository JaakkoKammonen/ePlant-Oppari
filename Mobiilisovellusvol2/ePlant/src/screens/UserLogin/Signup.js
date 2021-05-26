import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import LogginMiddleware from "../../components/Redux/03-middleware/LogginMiddleware";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import swal from 'sweetalert';

export default function Signup(props) {

  // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = props.navigation.navigate;
  //console.log(props.navigation.state.params.errorAlert.title)

  const Signup2 = () => {
    LogginMiddleware.Signup(navigate, userEmail, userPassword, displayName, swal);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    console.log(passwordShown);
  };

   
  return (
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate("Login")}>
        <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
      </TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../../assets/ePlant_logo_signup.png")}
        />
        <Input
          placeholder=" Name"
          type="text"
          keyboardType="default"
          required={true}
          inputStyle={styles.signuptext}
          leftIcon={<Ionicons name="ios-person" size={15} color="grey" />}
          onChangeText={(text) => setDisplayName(text)}
        />
        <Input
          placeholder=" Email"
          type="text"
          required={true}
          inputStyle={styles.signuptext}
          leftIcon={<Ionicons name="ios-mail" size={15} color="grey" />}
          onChangeText={(text) => setUserEmail(text)}
        />
        <Input
          placeholder="Password"
          type={passwordShown ? "text" : "password"}
          required={true}
          secureTextEntry={true}
          inputStyle={styles.signuptext}
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
          title="Sign Up"
          buttonStyle={styles.buttonsignup}
          onPress={Signup2}
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
  arrow: {
    padding: 20,
    marginRight: 350,
    marginTop: 20,
    color: "#63816D",
  },
  logo: {
    width: 306,
    height: 214,
  },
  signuptext: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  buttonsignup: {
    backgroundColor: "#63816D",
    borderRadius: 3,
    marginRight: 3,
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  }
});
