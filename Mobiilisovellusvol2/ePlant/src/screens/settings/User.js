import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Button } from "react-native-elements";
import LogginMiddleware from '../../components/Redux/03-middleware/LogginMiddleware';

export default function UserNotification(props) {
   
    const { navigate } = props.navigation;
    let user = useSelector(state => state.user)

    const DeleteUser = (event) => {
        event.preventDefault();
        LogginMiddleware.DeleteUser(user)
    }
    const UserInfo = () => {
        return (
            <View>
               <Text>
                   User name: {user.displayName}
                </Text> 
            
                <Text>
                   User email: {user.email}
                </Text>

                <Button
                title="Edit user"
                onPress={() => navigate("EditUser", {user: user, navigate:navigate})}
                />
                <Button
                title="Delete all user data"
                onPress={() => DeleteUser}
                />


            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            
            <View>
                <TouchableOpacity onPress={() => navigate('Settings')}>
                    <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
                </TouchableOpacity>
                <Text style={styles.description}>Tähän käyttäjän omat ilmoitusasetukset</Text>
                
                {UserInfo()}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
        flex: 1,
    },
    topimage: {
        width: '100%',
        height: 250
    },
    description: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        fontSize: 14
    },
    arrow: {
        marginLeft: 20,
        marginTop: 10,
        color: 'grey'
    }
});