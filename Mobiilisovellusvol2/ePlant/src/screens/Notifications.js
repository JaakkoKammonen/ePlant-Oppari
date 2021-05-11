import React from "react";
import SafeAreaView from 'react-native-safe-area-view';
import { View, Text, StyleSheet, FlatList} from "react-native";
import { useSelector } from "react-redux";

export default function Notifications() {

  const myPlants = useSelector(state => state.firebase.my_Plants)

  //console.log(myPlants)

  const renderNotifications = () => {
    if (myPlants !== "No plants yet") {
      return (
        <FlatList
              data={myPlants}
              keyExtractor={(item, index) => index.toString()}
              marginLeft={230}
              renderItem={({ item }) => (
                <View style={styles.notification}>
                  <View>
                    <View style={styles.circle} />
                  </View>
                  <View style={styles.notificationTexts}>
                    <Text style={styles.subHeader}>Tänään klo 8.20</Text>
                    <Text style={styles.title}>{item.plantName} kasteltu.</Text>
                  </View>
                </View>
              )}
            />
      )
    } else {
      return (
        <Text>
          No ePlants yet! Add them first
        </Text>
      )
    }
  }
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Notifications</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.bottom2}>
            
            {renderNotifications()}

          </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCFCFC",
    flex: 1,
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
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 48,
    paddingBottom: 20,
    borderBottomColor: "#DEDDDD",
    borderBottomWidth: 1,
  },
  bottom: {
    marginLeft: 10,
    flex: 2,
    marginTop: 20,
  },
  bottom2: {
    fontSize: 14,
  },
  notification: {
    flexDirection: "row",
    width: 179,
    height: 40,
    marginBottom: 35,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 100 / 2,
    backgroundColor: "#eaaf7e",
  },
  notificationTexts: {
    marginLeft: 10,
    marginBottom: 10,
    flex: 2,
  },
  subHeader: {
    marginLeft: 5,
    fontSize: 12,
    color: "#ACACAC",
    fontWeight: "bold",
    marginBottom: 6,
  },
  title: {
    marginLeft: 5,
    fontSize: 16,
  },
});
