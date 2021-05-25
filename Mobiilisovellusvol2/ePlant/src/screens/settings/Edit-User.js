import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LogginMiddleware from "../../components/Redux/03-middleware/LogginMiddleware";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";

export default function Login(props) {
  const [user, setUser] = useState({
    displayName: props.navigation.state.params.user.displayName
  });

  const [new_user, setNewUser] = useState({
    displayName: props.navigation.state.params.user.displayName
  });

  const navigate = props.navigation.state.params.navigate

  //console.log(props.navigation.state.params.user)
  
  const EditUser = () => {
    LogginMiddleware.ModifyUser(new_user, navigate)
  }
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigate('User')}>
        <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
    </TouchableOpacity>

    <Text>
        User name : {user.displayName}
    </Text>
      <Input
        placeholder={user.displayName}
        type="text"
        required={true}
        inputStyle={styles.signintext}
        onChangeText={(text) => setNewUser({...new_user, displayName: text})}
      />
    
    <Button
    title= "Edit"
    onPress={() => EditUser()}
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
  
});
