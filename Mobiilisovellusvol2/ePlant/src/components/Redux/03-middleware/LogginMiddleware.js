import { useState } from "react";
import { Alert } from "react-native";
import firebase from "../../firebaseConfig"

function CheckIfLoggedIn(navigate) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user)
            navigate("Home")
        } else {
            navigate("Login", {navigate})
        }

    })
    }

function LogIn(navigate, userEmail, UserPassword) {
    firebase.auth()
    .signInWithEmailAndPassword(userEmail, UserPassword)
    .then(() => {
        console.log('User account signed in!');
        navigate("Home");
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        alert('That email address is already in use!')
        navigate("Login");
        }

        if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        alert('That email address is invalid!')
        navigate("Login");
        }
        navigate("Login");
        
    });
}    

function LogOut(navigate) {
firebase.auth()
  .signOut()
  .then(() => {
  console.log('User signed out!')
  navigate("Login")
  });
}


function GetUser() {
   const [user, setUser] = useState("") 

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUser(user.providerData[0].email)
        } else {
            setUser("Not logged in!")
        }

    })
    return user
}

export default {
    CheckIfLoggedIn,
    LogIn,
    LogOut,
    GetUser
}