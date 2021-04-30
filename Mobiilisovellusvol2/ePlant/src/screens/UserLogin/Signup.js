import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import LogginMiddleware from "../../components/Redux/03-middleware/LogginMiddleware"

export default function Login(props) {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const navigate = props.navigation.navigate
    //console.log(props.navigation.state.params.errorAlert.title)


    const Signup = () => {
        LogginMiddleware.Signup(navigate, userEmail, userPassword, displayName)   
    }   
  

  return (
    <View>
        <Text>
            Signup now
        </Text>
        
    <TextInput
        placeholder="Name"
        //style={styles.input}
        onChangeText={ text => setDisplayName(text)}
    />
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
      onPress={Signup}
       />
    


    </View>
  );
}