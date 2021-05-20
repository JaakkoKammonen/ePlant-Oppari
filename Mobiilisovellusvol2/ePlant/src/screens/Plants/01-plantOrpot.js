import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";

export default function PlantOrPot({ navigation }) {
  const { navigate } = navigation;

  return (
    <ScrollView style={styles.container}>
     <View style={styles.header}>
        <Text style={styles.headerText}>Add a new plant or a pot</Text>
      </View>
      <Card style={styles.card}>
        <Card.Title>PLANT</Card.Title>
        <Card.Divider />
        <Card.Image source={require("../../assets/selectplant.png")}
         onPress={() => navigate("SelectPlant")}
         style={styles.plantorpot}>
        </Card.Image>
      </Card>
      <Card>
        <Card.Title>POT</Card.Title>
        <Card.Divider />
        <Card.Image source={require("../../assets/selectpot.png")}
            onPress={() => navigate("SelectePlantModel")}
            style={styles.plantorpot}>
        </Card.Image>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  plantorpot: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 35,
    marginRight: 50,
    width: 250,
    height: 195,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 48,
    marginBottom: 20,
  },
  header: {
    shadowColor: "#DEDDDD",
    shadowOpacity: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 4,
    backgroundColor: "#FAFAFA",
  },
});
