import firebase from "../../firebaseConfig"
import {
  setMyPlants,
  setPlants,
  setPots,
  setePlantModels
} from "../01-actions"

// Get my plants
function UpdateMyPlants(dispatch) {
firebase.database().ref('omatkasvit/').on('value', snapshot => {
    const plants = Object.values(snapshot.val());
    //console.log(snapshot.val())
    dispatch(setMyPlants(plants))
});
}

function UpdatePlants(dispatch) {
  firebase.database().ref('kasvit/').on('value', snapshot => {
    const plantList = Object.values(snapshot.val());
    dispatch(setPlants(plantList))
});
}
function UpdatePots(dispatch) {
firebase.database().ref('ruukut/').on('value', snapshot => {
  const potList = Object.values(snapshot.val());
  dispatch(setPots(potList))
});
}

function UpdateEPlantModels(dispatch) {
  firebase.database().ref('/ePlant-models').on('value', snapshot => {
    const ePlantModels = Object.values(snapshot.val());
    //console.log(ePlantModels)
    dispatch(setePlantModels(ePlantModels))
  
  });
  }

// Sisään lajike, omakeksimä nimi, ruukun nimi ja id sekä navigate
function AddPlantToDatabase(species, plantName,potName,potId,navigate) {
  firebase.database().ref('omatkasvit/').push(
      {
          'laji': species,
          'nimi': plantName,
          'paivays': Date(),
          'ruukku': potName,
          'ruukkuid': potId 
      }
  )
  navigate('Home', {showSnackbar: true, plantName: plantName})
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


function DBUserData() {
  let userdb;
  firebase.database().ref('Users/').on('value', snapshot => {
      userdb = Object.values(snapshot.val());
  });
  return userdb
  }

function AddePlantPot(userUid, thingspeakId, version) {

  firebase.database().ref('users/' + userUid + '/ePlant').set(
    {
      uid: userUid, 
     
    }
)

//console.log(userCheck)

}  
export default {
  UpdateMyPlants,
  UpdatePlants,
  UpdatePots,
  AddPlantToDatabase,
  UpdateEPlantModels,
  AddUserToDatabase,
  DBUserData,
  AddePlantPot
}