import firebase from "../../firebaseConfig"
import {
  setMyPlants,
  setPlants,
  setPots
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

export default {
  UpdateMyPlants,
  UpdatePlants,
  UpdatePots,
  AddPlantToDatabase
}