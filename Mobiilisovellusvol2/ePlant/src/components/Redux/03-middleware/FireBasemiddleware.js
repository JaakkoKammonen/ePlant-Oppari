import { useSelector } from "react-redux";
import firebase from "../../firebaseConfig"
import {
  setPlants,
  setePlantModels,
  setUser_ePlants,
  setUser_Plants
} from "../01-actions"

// Get my plants
function UpdateMyPlants(dispatch) { 

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebase.database().ref('users/' + user.uid + "/myPlants/").on('value', snapshot => {
      //console.log(snapshot.val())
    if (snapshot.val() !== null) {
    const plants = snapshot.val();
    //console.log(snapshot.val())
    dispatch(setUser_Plants(plants))
  } else {
    dispatch(setUser_Plants("No plants yet"))
  }
    })
  } 
})

}

function UpdateMyePlantPots(dispatch) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.database().ref('users/' + user.uid + "/ePlant/").on('value', snapshot => {
        if(snapshot.val() !== null) {
        //console.log(snapshot.val())
        const userePlants = snapshot.val();
        dispatch(setUser_ePlants(userePlants))
      } else {
        dispatch(setUser_ePlants("No ePlants yet"))
      }
      });
    }
});
}


function UpdatePlants(dispatch) {
  firebase.database().ref('kasvit/').on('value', snapshot => {
    const plantList = Object.values(snapshot.val());
    dispatch(setPlants(plantList))
});
}


function UpdateEPlantModels(dispatch) {
  firebase.database().ref('/ePlant-models').on('value', snapshot => {
    const ePlantModels = Object.values(snapshot.val());
    //console.log(ePlantModels)
    dispatch(setePlantModels(ePlantModels))
  
  });
  }



function AddUserToDatabase(userUid, userEmail, userDisplayName) {
  firebase.database().ref('users/' + userUid).set(
    {
      uid: userUid, 
      name: userDisplayName,
      email: userEmail,
    }
)
}


function AddPlantToUser(userUid,species, plantName, ePlant, navigate) {
  firebase.database().ref('users/' + userUid + "/myPlants").push(
      {
          'species': species,
          'plantName': plantName,
          'date': Date(),
          "ePlantPot": ePlant
      }
  )
  navigate('Home', {showSnackbar: true, plantName: "New " + plantName + " was added!"})
}


function AddePlantToUser(userUid, ePlant, navigate) {

  //console.log(ePlant)
     firebase.database().ref('users/' + userUid + '/ePlant').push(
    { 
      channel_id: ePlant.channel_id,
      write_apikey: ePlant.write_apikey,
      ePlantModel: ePlant.ePlantModel
    }
  )

  navigate('Home', {showSnackbar: true, plantName: "New ePlant was added"})
}  

function ModifyUserEPlant(ePlant, navigate) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.database().ref('users/' + user.uid + "/ePlant/" + ePlant.ePlantID).update({
        channel_id: ePlant.channel_id,
        write_apikey: ePlant.write_apikey
      })
    }
    navigate('Home', {showSnackbar: true, plantName: "ePlant was updated!"})
});
}
function DeleteUserEPlant(ePlantID) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.database().ref('users/' + user.uid + "/ePlant/" + ePlantID).remove()
    }
});
}

function DeleteUserMyPlant(ePlantID, navigate) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.database().ref('users/' + user.uid + "/myPlants/" + ePlantID).remove();
      navigate('Home', {showSnackbar: true, plantName: "Plant was deleted!"}) 
    } else {
      navigate('Home', {showSnackbar: true, plantName: "Something went wrong!"})
    }
});
}


export default {
  UpdateMyPlants,
  UpdatePlants,
  AddPlantToUser,
  UpdateEPlantModels,
  AddUserToDatabase,
  AddePlantToUser,
  UpdateMyePlantPots,
  ModifyUserEPlant,
  DeleteUserEPlant,
  DeleteUserMyPlant
}