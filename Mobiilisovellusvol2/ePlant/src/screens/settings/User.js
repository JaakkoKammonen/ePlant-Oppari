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
    let plants = useSelector(state => state.firebase.my_Plants)
    let ePlants = useSelector(state => state.firebase.my_ePlants)

    try {
      if(plants !== "No plants yet") {
        plants = Object.values(plants).length;
      } else {
        plants = 0
      }
      
    } catch (error) {
      plants = 0;

    }

    try {
      if(ePlants !== "No ePlants yet") {
        ePlants = Object.values(ePlants).length;
      } else {
        ePlants = 0
      }
    } catch (error) {
      ePlants = 0;
      
    }
    //console.log(plants, ePlants)

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
          <View style={styles.profiledetail}>
            <View style={styles.detailcontent}>
              <Text style={styles.title}>Plants</Text>
              <Text style={styles.count}>{plants}</Text>
            </View>
            <View style={styles.detailcontent}>
              <Text style={styles.title}>Pots</Text>
              <Text style={styles.count}>{ePlants}</Text>
            </View>
          </View>
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
        marginTop: 40,
      },
      bodycontent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
      },
      name:{
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
      },
      email:{
        fontSize: 16,
        marginTop: 2,
        fontStyle: "italic",
        color: "#63816D"
      },
      buttoncontainer: {
        marginTop: 10,
        width: 100,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
      },
      userbutton: {
        backgroundColor: "#63816D",
        borderRadius: 10,
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
      },
      profiledetail:{
        alignSelf: 'center',
        marginTop: 2,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#ffffff"
      },
      detailcontent:{
        margin: 10,
        alignItems: 'center'
      },
      title:{
        fontSize: 18,
        color: "#696969",
      },
      count:{
        fontSize: 14,
      },
});