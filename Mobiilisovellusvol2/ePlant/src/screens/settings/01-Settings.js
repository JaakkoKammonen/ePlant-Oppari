import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, ListItem, Icon, Button } from "react-native-elements";
import LogginMiddleware from "../../components/Redux/03-middleware/LogginMiddleware";

export default function Settings(props) {
  
  const { navigate } = props.navigation;

  // list of listitems headers and icons to make list rendering cleaner
  const list = [
    {
      name: "Plant pots",
      icon: "local-drink",
      navigate: "Pots"
    },
    {
      name: "Safety",
      icon: "security",
      navigate: "Safety"
    },
    {
      name: "UserNotification",
      icon: "notifications",
      navigate: "UserNotification"
    },
    {
      name: "Info",
      icon: "info",
      navigate: "Info"
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
            <Avatar
              size="large"
              rounded
              title="JK"
              overlayContainerStyle={{
                backgroundColor: "#63816D",
              }}
            />
          </View>
          <View style={styles.profileinfo}>
            <Text style={{ fontSize: 25, marginBottom: 5 }}>Jace</Text>
            <Text style={{ fontStyle: "italic", color: "#63816D" }}>
              @jace123
            </Text>
            <Button 
            title="Logout"
            onPress={() => LogginMiddleware.LogOut(navigate)}
            />
          </View>
        </View>

        {list.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => navigate(l.navigate)}
          >
            <Icon name={l.icon} color="#555555" />
              <ListItem.Title>{l.name}</ListItem.Title>
          </ListItem>
        ))}
      </View>

      <Button
        title="Kirjaudu ulos"
        type="clear"
        titleStyle={{ color: "#63816D" }}
        buttonStyle={styles.logout}
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
  logout: {
    position: "absolute",
    bottom: 10,
    left: 10,
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
});
