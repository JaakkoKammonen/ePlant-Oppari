import { useState } from "react";
import firebase from "../../firebaseConfig"
import FireBasemiddleware from "./FireBasemiddleware";
import {setUser} from "../01-actions"

function CheckIfLoggedIn(navigate) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //console.log(user)
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
        alert("Invalid email or password")
        navigate("Login");
        
    });
}   

function Signup(navigate, userEmail, UserPassword, displayName) {
    firebase.auth()
    .createUserWithEmailAndPassword(userEmail, UserPassword)
    .then((userCredential) => {
      // Signed in
      //console.log(userCredential.user)
      //console.log(firebase.auth().currentUser)
      var user = userCredential.user;

        user.updateProfile({displayName: displayName});

        FireBasemiddleware.AddUserToDatabase(user.uid, user.email, displayName)
    navigate("Home")
    })
    .catch((error) => {
      alert(error.code,error.message);
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


function UpdateUserData(dispatch) {
     firebase.auth().onAuthStateChanged((user) => {
         if (user) {
             dispatch(setUser(user))
         } else {
             setUser("error")
         }
     })   
}

function ResetPasswordSendEmail(typedEmail) {
    firebase.auth().sendPasswordResetEmail(typedEmail).then(function() {
        alert("New password is send to email address")
      }).catch(function(error) {
        // An error happened.
        alert("Error happened. Try again or create new user.")
      });
    
}

function DeleteUser(user) {

    try {
         user.delete().then(function() {
        // User deleted.
        firebase.database().ref('users/' + user.uid).remove()

        alert("All user data has been removed")
            
        }).catch(function(error) {
        // An error happened.
            console.log(error)
        });

     
      } catch (error) {
          alert("User info was not deleted from database. Log out and back in then try again. If there is still problem please contact us.")
      }
      
     


}

export default {
    CheckIfLoggedIn,
    LogIn,
    LogOut,
    UpdateUserData,
    Signup,
    ResetPasswordSendEmail,
    DeleteUser
}