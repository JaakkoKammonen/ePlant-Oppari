import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ListItem, Icon, Button } from "react-native-elements";
import LogginMiddleware from "../../components/Redux/03-middleware/LogginMiddleware";
import logo from "../../assets/eP_transparent.png";

export default function Settings(props) {
  const { navigate } = props.navigation;
  let user = LogginMiddleware.GetUserData();

  // list of listitems headers and icons to make list rendering cleaner
  const list = [
    {
      name: "Plant pots",
      icon: "local-drink",
      navigate: "Pots",
    },
    {
      name: "Safety",
      icon: "security",
      navigate: "Safety",
    },
    {
      name: "User",
      icon: "notifications",
      navigate: "UserNotification",
    },
    {
      name: "Info",
      icon: "info",
      navigate: "Info",
    },
    {
      name: "Logout",
      icon: "logout",
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
              style={{ fontStyle: "italic", color: "#63816D", marginBottom: 5 }}
            >
              {user.uid}
            </Text>
          </View>
        </View>

        {list.map((l, i) => (
          <ListItem key={i} bottomDivider onPress={() => navigate(l.navigate)}>
            <Icon name={l.icon} color="#555555" />
            <ListItem.Title>{l.name}</ListItem.Title>
          </ListItem>
        ))}
      </View>
      <Button
        buttonStyle={styles.buttonlogout}
        title="Logout"
        onPress={() => LogginMiddleware.LogOut(navigate)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCFCFC",
    flex: 1,
    flexDirection: "column",
  },
  profilecontainer: {
    padding: 20,
    borderBottomColor: "#DEDDDD",
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 120,
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  profileinfo: {
    marginLeft: 20,
    flex: 2,
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
  buttonlogout: {
    backgroundColor: "#63816D",
    borderRadius: 3,
    marginRight: 3,
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  logo: {
    width: 90,
    height: 90,
  },
});
