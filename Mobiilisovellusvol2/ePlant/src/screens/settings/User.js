import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Button } from "react-native-elements";
import LogginMiddleware from '../../components/Redux/03-middleware/LogginMiddleware';
import swal from 'sweetalert';

export default function UserNotification(props) {
   
    const { navigate } = props.navigation;
    let user = useSelector(state => state.user)

    const DeleteUser = () => {

        swal({
            title: "Delete user?",
            text: "Are you sure? This will delete user and all user data from databases!",
            icon: "warning",
            buttons: [true, "Do it!"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                swal({
                    title:"Input your password",
                    content: {
                    element: "input",
                    attributes: {
                        placeholder: "Type your password",
                        type: "password",
                      },
                    },
                  }).then((password) => {
                    //console.log(item)
                    LogginMiddleware.DeleteUser(user, password, navigate)
                  });
            

            
            } else {
              swal("Your plant is safe!", {
                button: "Close",
                timer: 1500,
              });
            }
          });
        
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
                onPress={() => DeleteUser()}
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