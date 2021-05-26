import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import setImage from "../components/SetImage";

export default function PlantCards({ navigation }) {

  // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

  const plants = useSelector((state) => state.firebase.plants);
  //console.log(plants)
  const foodPlants = plants.filter((plant) => plant.tyyppi === "Food plant");
  const feature = plants.filter((plant) => plant.ominaisuus === "Annual");
  const feature2 = plants.filter((plant) => plant.ominaisuus === "Biennial");
  const feature3 = plants.filter((plant) => plant.ominaisuus === "Perennial");

  const { navigate } = navigation;

  // sending selected items data to next screen and navigating to there
  const handleSelect = (item) => {
    navigate("Plant", { plant: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.category}>
        <Text style={styles.all}>All</Text>
        <FlatList
          horizontal={true}
          contentContainerStyle={{ alignSelf: "flex-start" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          marginLeft={10}
          data={foodPlants}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              title="Plant"
              style={styles.border}
            >
              <Image
                style={styles.plantimage}
                source={setImage(item.laji.toLowerCase())}
              />
              <View style={styles.plant_container}>
                <Text style={styles.plantheader}>{item.laji}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.annual}>Annual</Text>
        <FlatList
          horizontal={true}
          contentContainerStyle={{ alignSelf: "flex-start" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          marginLeft={10}
          data={feature}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              title="Plant"
              style={styles.border}
            >
              <Image
                style={styles.plantimage}
                source={setImage(item.laji.toLowerCase())}
              />
              <View style={styles.plant_container}>
                <Text style={styles.plantheader}>{item.laji}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.biennial}>Biennial</Text>
        <FlatList
          horizontal={true}
          contentContainerStyle={{ alignSelf: "flex-start" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          marginLeft={10}
          data={feature2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              title="Plant"
              style={styles.border}
            >
              <Image
                style={styles.plantimage}
                source={setImage(item.laji.toLowerCase())}
              />
              <View style={styles.plant_container}>
                <Text style={styles.plantheader}>{item.laji}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.perennial}>Perennial</Text>
        <FlatList
          horizontal={true}
          contentContainerStyle={{ alignSelf: "flex-start" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          marginLeft={10}
          data={feature3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              title="Plant"
              style={styles.border}
            >
              <Image
                style={styles.plantimage}
                source={setImage(item.laji.toLowerCase())}
              />
              <View style={styles.plant_container}>
                <Text style={styles.plantheader}>{item.laji}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    category: {
      marginTop: 25,
      marginBottom: 25,
    },
    all: {
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 10,
      marginBottom: 17,
    },
    border: {
      elevation: 3, // android
      borderRadius: 4,
      margin:5,
      height: 187,
      width: 170,
      marginTop: 10,
      backgroundColor: 'white',
    },
    plantimage: {
      width: 172,
      height: 187,
      borderRadius: 6,
    },
    plant_container: {
      position: "absolute",
      width: 170,
      height: 30,
      bottom: 0,
      backgroundColor: "rgba(0,0,0, 0.3)",
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    plantheader: {
      textAlign: "center",
      fontSize: 16,
      marginTop: 3,
      color: "white",
      fontWeight: "normal",
    },
    annual: {
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 10,
      marginTop: 17,
      marginBottom: 17,
    },
    biennial: {
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 10,
      marginTop: 17,
      marginBottom: 17,
    },
    perennial: {
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 10,
      marginTop: 17,
      marginBottom: 17,
    },
});
