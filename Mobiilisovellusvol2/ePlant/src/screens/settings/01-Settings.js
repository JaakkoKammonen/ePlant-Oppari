import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import LogginMiddleware from "../../components/Redux/03-middleware/LogginMiddleware";
import { useSelector } from "react-redux";

export default function Settings(props) {

  // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

  const { navigate } = props.navigation;
  let user = useSelector((state) => state.user);

  // list of listitems headers and icons to make list rendering cleaner
  const list = [
    {
      name: "ePlant pots",
      icon: "local-drink",
      navigate: "Pots",
    },
    {
      name: "Info",
      icon: "info",
      navigate: "Info",
    },
    {
      name: "Safety",
      icon: "security",
      navigate: "Safety",
    },
    {
      name: "User",
      icon: "notifications",
      navigate: "User",
    },
    {
      name: "Help",
      icon: "help",
      navigate: "Help",
    },
    
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.profilecontainer}>
          <View>
            <Image
              style={styles.logo}
              source={require("../../assets/eP_transparent.png")}
            />
          </View>
          <View style={styles.profileinfo}>
            <Text style={{ fontSize: 20, marginBottom: 5 }}>
              {user.displayName}
            </Text>
            <Text
              style={styles.useremail}
            >
              {user.email}
            </Text>
          </View>
        </View>

        {list.map((l, i) => (
          <ListItem key={i} bottomDivider onPress={() => navigate(l.navigate)}>
            <Icon name={l.icon} color="#555555" />
            <ListItem.Title>{l.name}</ListItem.Title>
          </ListItem>
        ))}

        <ListItem 
        bottomDivider 
        onPress={() => LogginMiddleware.LogOut(navigate)}
        >
            <Icon name="logout" color="#555555" />
            <ListItem.Title>
              Logout
              </ListItem.Title>
        </ListItem>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  profilecontainer: {
    padding: 20,
    borderBottomColor: "#DEDDDD",
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 120,
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
  },
  profileinfo: {
    marginLeft: 20,
    flex: 2,
  },
  useremail: {
    fontStyle: "italic",
    color: "#63816D", 
    marginBottom: 5
  }
});
