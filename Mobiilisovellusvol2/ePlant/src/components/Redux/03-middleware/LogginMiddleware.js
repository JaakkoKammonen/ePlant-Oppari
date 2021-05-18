import { useState } from "react";
import firebase from "../../firebaseConfig"
import FireBasemiddleware from "./FireBasemiddleware";
import {setUser} from "../01-actions"
import swal from 'sweetalert';

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
        //console.log('User account signed in!');
        navigate("Home");
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');

        swal(
            {
           title: "That email address is already in use!",
           button: true,
         });

        navigate("Login");
        }

        if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        swal(
            {
           title: "That email address is invalid!",
           button: true,
         });
        navigate("Login");
        }

        swal(
            {
           title: "Invalid email or password!",
           button: true,
         });
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
        swal(
             error.code,error.message,
          );
     
    });

    
}  

function LogOut(navigate) {
firebase.auth()
  .signOut()
  .then(() => {
  //console.log('User signed out!')
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
function ModifyUser(newUser, navigate) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            user.updateProfile({
                displayName: newUser.displayName,
              }).then(function() {
                // Update successful.
                firebase.database().ref('users/' + user.uid).update({
                    displayName: newUser.displayName,
                  })

                navigate('Home', {showSnackbar: true, plantName: "User was updated!"})
                
              }).catch(function(error) {
                // An error happened.
                swal(
                    {
                   title: "Something went wrong",
                   button: true,
                 });
              });
        }
    })   
}

function ResetPasswordSendEmail(typedEmail) {
    firebase.auth().sendPasswordResetEmail(typedEmail).then(function() {
        swal(
            {
           title: "New password is send to email address",
           button: true,
         });
      }).catch(function(error) {
        // An error happened.
        swal(
            {
           title: "Wrong email!",
           button: true,
         });
      });
    
}

function DeleteUser(user, password, navigate) {
    
    //console.log(user.email, password)
    
    firebase.auth().signInWithEmailAndPassword(user.email, password)
    .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        user.delete().then(function() {
         // User deleted.
        firebase.database().ref('users/' + user.uid).remove()
    
        navigate('Login', { swal: true})
    }).catch(function(error) {
        // An error happened.
        swal({
           title: "Something went wrong!",
           button: true,
         });
        });

    }).catch((error) => {
        swal(
             {
            title: "Wrong password",
            button: true,
          });
        //console.log(error)
    });
      
}

export default {
    CheckIfLoggedIn,
    LogIn,
    LogOut,
    UpdateUserData,
    Signup,
    ResetPasswordSendEmail,
    DeleteUser,
    ModifyUser
}