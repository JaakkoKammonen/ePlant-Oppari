import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import LogginMiddleware from "../../components/Redux/03-middleware/LogginMiddleware"

export default function Login(props) {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = props.navigation.navigate
    //console.log(props.navigation.state.params.errorAlert.title)


    const LogIn = () => {
        LogginMiddleware.LogIn(navigate, userEmail, userPassword)   
    }   
  

  return (
    <View>

    <TextInput
        placeholder="Email"
        //style={styles.input}
        onChangeText={text => setUserEmail(text)}
      />
      <TextInput
        placeholder="Password"
        //style={styles.input}
        onChangeText={ text => setUserPassword(text)}
      />

      <Button 
      title="SignIn"
      onPress={LogIn}
       />

    <Text>
      Not a member? 
    </Text>

      <Text style={{color: 'blue'}}
      onPress={() => navigate("Singup")}>
      Signup now
    </Text>
    </View>
  );
}