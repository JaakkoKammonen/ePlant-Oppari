import { useSelector } from "react-redux";
import firebase from "../../firebaseConfig"
import {
  setPlants,
  setePlantModels,
  setUser_ePlants,
  setUser_Plants,
  setUser_Notifications
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
    UpdateNotifications(dispatch, plants)
  } else {
    dispatch(setUser_Plants("No plants yet"))
  }
    })
  } 
})
}

function UpdateNotifications(dispatch, my_Plants) { 

  Object.values(my_Plants).map((plant) => {

    const url = 'https://api.thingspeak.com/channels/' + plant.ePlantPot.channel_id + '/feeds.json';
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson.feeds)
            //console.log(responseJson.feeds[responseJson.feeds.length-1])

            let lastTen = responseJson.feeds.slice(responseJson.feeds.length-11, responseJson.feeds.length-1);

            //console.log(lastTen)
             let mapped = lastTen.map((feedItem) => {
              let time = feedItem.created_at.slice(0 , feedItem.created_at.length-1)
                let data = {
                imagesrc: plant.species,
                time: time,
                plantname: plant.plantName,
                field1Name: plant.ePlantPot.ePlantModel.Field1,
                field1Value: feedItem.field1,
                field2Name: plant.ePlantPot.ePlantModel.Field2,
                field2Value: feedItem.field2
                }
                return data
             })
             dispatch(setUser_Notifications(mapped))
        })
        .catch((error) => {
            //console.log(error)
            dispatch(setUser_Notifications(["null"]))
        });
        
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

  console.log(ePlant)
  firebase.database().ref('users/' + userUid + "/myPlants").push(
      {
          species: species,
          plantName: plantName,
          date: Date(),
          ePlantPot: {
            ePlantID: ePlant[0],
            channel_id: ePlant[1].channel_id,
            write_apikey: ePlant[1].write_apikey,
            ePlantModel: ePlant[1].ePlantModel
          }
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
    //console.log(ePlant)
    if (user) {

    firebase.database().ref('users/' + user.uid + "/myPlants/").on('value', snapshot => {

        
        let myPlants = Object.values(snapshot.val())
        let myPlantWithIDs = Object.entries(snapshot.val())
        //console.log(myPlants, myPlantWithIDs)

         let ifFound = myPlants.map((item, index) => {
            //console.log(item)          
            //console.log(ePlant)

            if (ePlant.channel_id === item.ePlantPot.channel_id ) {
              return "Error"
            } else if (ePlant.write_apikey === item.ePlantPot.write_apikey ) {
              return "Error"
            }
            else if(ePlant.ePlantID === item.ePlantPot.ePlantID) {
              return index
            } else {
              return null
            }

        })
        let found = ifFound.filter(i => i !== null)

        if(found.includes("Error")) {
          navigate('Home', {showSnackbar: true, plantName: "You cannot have two ePlants with same channel id or write_apikey!"})
        }  else {

          let foundIndex = found[0]
          let plantID = myPlantWithIDs[foundIndex]
          //console.log(plantID)
          if (found.length = 1) {
            if (plantID !== undefined) {

              firebase.database().ref('users/' + user.uid + "/myPlants/" + plantID[0] + "/ePlantPot/").update({
              channel_id: ePlant.channel_id,
              write_apikey: ePlant.write_apikey
            })

          }
          }


          firebase.database().ref('users/' + user.uid + "/ePlant/" + ePlant.ePlantID).update({
            channel_id: ePlant.channel_id,
            write_apikey: ePlant.write_apikey
          })

          navigate('Home', {showSnackbar: true, plantName: "ePlant was updated!"})
        }
        
      })

      
    }
    
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