import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import setImage from "../components/SetImage";

export default function Notifications() {
  
  let allNotifications = [];

  try {
    allNotifications = useSelector(state => state.firebase.notification).slice().sort((a, b) => new Date(b.time) - new  Date(a.time))
  } catch (error) {
    allNotifications = []
  }
  

  //console.log(allNotifications)
  const timeParser = (date) => {
        
        let year = date.slice(0, 4)
        let month = date.slice(5, 7)
        let day = date.slice(8, 10)
        let time = date.slice(11, 19)

        return( day + "." + month + "." + year + " at: " +time)
    }


  const renderNotifications = () => {
    if (allNotifications.length > 1) {

      return (
        <FlatList
          data={allNotifications}
          keyExtractor={(item, index) => index.toString()}
          marginLeft={230}
          renderItem={({ item }) => (
            <View style={styles.bottomitem}>
                    <View>
                      
                    <Image style={styles.circle} source={setImage(item.imagesrc.toLowerCase())}/>
                    </View>
                    <View style={styles.bottomtext}>
                        <Text style={styles.timetext}>{timeParser(item.time)}</Text>
                        <Text style={styles.fieldname}>{item.plantname} values were updated</Text>
                        <Text style={styles.field01}>{item.field1Name}:<Text style={styles.field01value}>{item.field1Value}</Text></Text>
                        <Text style={styles.field02}>{item.field2Name}:<Text style={styles.field01value}>{item.field2Value}</Text></Text>
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
      <ScrollView 
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollable}>
                <View style={styles.bottom}>

        {renderNotifications()}
        </View>
      </ScrollView>
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
  scrollable: {
    margin: 10, 
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
    marginTop: 10,
},
  bottom2: {
    fontSize: 14,
},
  bottomtext: {
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 5,
},
  timetext: {
    marginLeft: 5,
    fontSize: 12,
    color: "#ACACAC",
    fontWeight: "bold"
},
  bottomitem: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 10
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
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 100/2,
    backgroundColor: '#eaaf7e'
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
  fieldname: {
    marginLeft: 4,
    fontSize: 16
},
  field01: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
},
  field01value: {
    fontSize: 10,
    fontWeight: "normal",
    marginLeft: 3,
},
  field02: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
},
  field02value: {
    fontSize: 10,
    fontWeight: "normal",
    marginLeft: 3,
}
});
