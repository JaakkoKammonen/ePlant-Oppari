import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Info(props) {
  // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

  const { navigate } = props.navigation;

  // returning plant data based on props from Search.js and plantImage from SetBackgroundImg.js
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate("Settings")}>
        <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
      </TouchableOpacity>
      <Image
        style={styles.backgroundImage}
        source={require("../../assets/information.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 3,
    marginBottom: 10,
  },
  arrow: {
    marginLeft: 20,
    marginTop: 10,
    color: "grey",
  },
  backgroundImage: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    resizeMode: "center",
  },
});
