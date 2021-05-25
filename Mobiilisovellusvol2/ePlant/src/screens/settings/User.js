import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
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
            title: "Delete your account?",
            text: "Are you sure? This will delete your account and all of your data from databases!",
            icon: "error",
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
              swal("Your account is safe!", {
                button: "Close",
                timer: 1500,
              });
            }
          });
        
    }
    const UserInfo = () => {
        return (
            <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigate('Settings')}>
                    <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
                </TouchableOpacity></View>
            <Image style={styles.avatar} source={require("../../assets/userprofile.png")}/>
            <View style={styles.body}>
              <View style={styles.bodycontent}>
              <Text style={styles.name}>{user.displayName}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <View style={styles.buttoncontainer}>
                <Button
                title="Edit username"
                buttonStyle={styles.userbutton}
                onPress={() => navigate("EditUser", {user: user, navigate:navigate})}
                />  
                </View>      
                <View style={styles.buttoncontainer}>
                <Button
                buttonStyle={styles.userbutton}
                title="Delete your account"
                onPress={() => DeleteUser()}
                />
                </View>
            <View>
            </View>
            </View>
            </View>
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
                {UserInfo()}
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
    },
    header:{
        shadowColor: "#DEDDDD",
        backgroundColor: "#FAFAFA",
        shadowOpacity: 2,
        shadowOffset: {
            height: 1,
            width: 1,
          },
        height:200,
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
      },
      name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
      },
      body:{
        marginTop:40,
      },
      bodycontent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
      },
      name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
      },
      email:{
        fontSize:16,
        marginTop: 10,
        fontStyle: "italic",
        color: "#63816D", 
        marginBottom: 5
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
      buttoncontainer: {
        marginTop: 10,
        width: 100,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      userbutton: {
        backgroundColor: "#63816D",
        borderRadius: 3,
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
      }
});