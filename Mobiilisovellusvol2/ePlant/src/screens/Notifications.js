import React from "react";
import { View, Text, StyleSheet, FlatList,Image, } from "react-native";
import { useSelector } from "react-redux";
import setImage from "../components/SetImage";

export default function Notifications() {
 

  const allNotifications = useSelector(state => state.firebase.notification).slice().sort((a, b) => new Date(b.time) - new  Date(a.time)).reverse()
  let plants = useSelector(state => state.firebase.my_Plants) 


  //console.log(myPlants)

  const renderNotifications = () => {
    if ( plants !== "No plants yet" ) {
      return (
        <FlatList
          data={allNotifications}
          keyExtractor={(item, index) => index.toString()}
          marginLeft={230}
          renderItem={({ item }) => (
            <View >
                    <View>
                      
                    <Image style={styles.circle} source={setImage(item.imagesrc.toLowerCase())}/>
                    
                    </View>
                    <View >
                        <Text >{item.time}</Text>
                        <Text >{item.plantname} values were updated</Text>
                        <Text >{item.field1Name}: {item.field1Value}</Text>
                        <Text >{item.field2Name}: {item.field2Value}</Text>
                    </View>
                </View>
          )}
        />
      );
    } else {
      return (
        <Text style={styles.noplants}>No ePlants yet! Add them first</Text>
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.bottom2}>{renderNotifications()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   // backgroundColor: "#FCFCFC",
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
  noplants: {
    fontSize: 14,
    fontWeight: "normal",
    marginLeft: 10,
    marginBottom: 15,
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
