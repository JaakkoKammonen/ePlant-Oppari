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
                field1Name: plant.ePlantPot.ePlantModel.Field1.Name,
                field1Value: feedItem.field1,
                field2Name: plant.ePlantPot.ePlantModel.Field2.Name,
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

  //console.log(ePlant)
  firebase.database().ref('users/' + userUid + "/myPlants").push(
      {
          species: species,
          plantName: plantName,
          date: Date(),
          ePlantPot: {
            ePlantID: ePlant[0],
            ePlantName: ePlant[1].ePlantName,
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
  let allMyEPlants = "";

  // Haetaan kaikki ePlantit
  firebase.database().ref('users/' + userUid + "/ePlant/").on('value', snapshot => {
    allMyEPlants = snapshot.val(); 
  })
    

    // Jos ePlanttej?? ei ole lis??t????n ePlant ja navigoidaan Homeen
    if ( allMyEPlants === null) {
      
      firebase.database().ref('users/' + userUid + '/ePlant').push(
        { 
          ePlantName: ePlant.ePlantName,
          channel_id: ePlant.channel_id,
          write_apikey: ePlant.write_apikey,
          ePlantModel: ePlant.ePlantModel
        }
        )
      
      navigate('Home', {showSnackbar: true, plantName: "New ePlant was added"})

    } else {
    
    // ePlanttej?? l??ytyi!
    let myePlants = Object.values(allMyEPlants)
    
    // K??yd????n ePlantit l??pi
    //console.log("ePlanttej?? l??ytyi")
    //console.log(ePlant, "Sy??tetty ePlant")
    let ifFound = myePlants.map((item) => {
      //console.log(item)
      if(item.channel_id === ePlant.channel_id) {
        // Sy??tetty channel_id l??ytyy jo ePlanteist??! Error
        //console.log("Sy??tetty channel_id l??ytyy jo ePlanteist??! Error")
        return "Error"
      } else if (item.write_apikey === ePlant.write_apikey) {
        // Sy??tetty write-apikey l??ytyy jo ePlanteist??! Error
        //console.log("Sy??tetty write_apikey l??ytyy jo ePlanteist??! Error")
        return "Error"
      } else {
        // ePlanteist?? ei l??ydy samaa write tai channel ID, Palautetaan Good arvo.
        return "Good"
      }
    })

    // Jos ei Erroreita voidaan lis??t?? ePlant
    //console.log(ifFound)
    if (ifFound.includes("Error")) {
      //console.log("Erroreita l??ytyi, sama channel_id tai write_apikey")
      navigate('Home', {showSnackbar: true, plantName: "You cannot have two ePlants with same channel id or write_apikey!"})
    } else {
    // Ei erroreita, list??t????n ePlant
    //console.log("Ei erroreita, lis??t????n uusi ePlant")
    firebase.database().ref('users/' + userUid + '/ePlant').push(
    { 
      ePlantName: ePlant.ePlantName,
      channel_id: ePlant.channel_id,
      write_apikey: ePlant.write_apikey,
      ePlantModel: ePlant.ePlantModel
    }
    )
     navigate('Home', {showSnackbar: true, plantName: "New ePlant was added"})
    }
    
  }

}  



function ModifyUserEPlant(ePlant, navigate) {
  firebase.auth().onAuthStateChanged((user) => {
     //console.log(ePlant, "Valittu ePlant")

    if (user) {

    let allMyEPlants = "";
    let allMyPlants="";
    let allMyPlantsWithID = "";

    // Haetaan kaikki k??ytt??j??n ePlantit
    firebase.database().ref('users/' + user.uid + "/ePlant/").on('value', snapshot => { 
      try {
        allMyEPlants = Object.values(snapshot.val())
      } catch (error) {
        allMyEPlants = snapshot.val()
      }  
    }); 
    
    // Haetaan kaikki k??ytt??j??n kasvit
    firebase.database().ref('users/' + user.uid + "/myPlants/").on('value', snapshot => {
      try {
        allMyPlants = Object.values(snapshot.val())
        allMyPlantsWithID = Object.entries(snapshot.val())
      } catch (error) {
        allMyPlants = snapshot.val();
        allMyPlantsWithID = snapshot.val()
      }
      
    })

    // Tarkistetaanko onko kasveja, jos arvo null niin ei ole
    if(allMyPlants === null) {

        // Ei kasveja, joten muokataan vain ePlantti??.
        let ifFound = allMyEPlants.map((item, index) => {
        
        // Jos yhdess?? ePlantissa on sama channel_id kuin tulevassa ePlantissa
        if (item.channel_id === ePlant.channel_id) {

          //console.log(allMyEPlants[index], item)

          // Jos se on sama item kun klikattu => palautus Good voidaan muokata
          if (allMyEPlants[index] === item) {
            //console.log( "Sama klikattu kasvi ja channel id, Good")
            return "Good"
          // Jos ei ole error, koska samat channelId
          } else {
            //console.log("Ei sama kasvi, mutta channel_id on sama kun jollain muulla, Error")
            return "Error"
          }
          // Jos Writekey on sama kun joku valmis ePlant
        } else if (item.write_apikey === ePlant.write_apikey) {
          // Jos se on sama mik?? klikattu => Good
          if (allMyEPlants[index] === item) {
            //console.log("Sama klikattu kasvi ja writekey, Good")
            return "Good"
          // Muutoin Error, koska sama Writeapikey
          } else {
            //console.log("Ei sama kasvi, mutta write on, Error")
            return "Error"
          }
          // Jos ei ole samaa write tai channel id palautetaan Good
        } else {
          //console.log("Ei sama channleID tai Write_apikey, Good")
          return "Good"
        }
      })
      //console.log(ifFound)

      // Jos sis??lt???? Errorin ei muokata mit????n ja palataan Homeen error kanssa.
      if (ifFound.includes("Error")) {
        //console.log("Error, jossain samassa ePlantissa on sama channel id tai Write apikey, joka ei ole sama valittu")
        navigate('Home', {showSnackbar: true, plantName: "You cannot have two ePlants with same channel id or write_apikey!"})
        
      } else {
        // Jos ei ole erroreita muokataan 
        //console.log("Ei erroreita, joten muokkaus l??pi")
        firebase.database().ref('users/' + user.uid + "/ePlant/" + ePlant.ePlantID).update({
          channel_id: ePlant.channel_id,
          write_apikey: ePlant.write_apikey
        })
        // Navigointi kotiin
        navigate('Home', {showSnackbar: true, plantName: "ePlant was updated!"})
      }

    } else {
      
      //console.log("Kasveja l??yty")
      // Kasveja l??ytyy! K??yd????n kasvit l??pi
      let ifFound = allMyPlants.map((item, index) => {
        //console.log(item)

        // Jos kasvilla on sama channel_id kun valitusta ePlantiss??
        if (ePlant.channel_id === item.ePlantPot.channel_id ) {
          //console.log("Kasvilla on sama channel_id")
          // Jos se on sama kun listan [] luku, voidaan kasvin ePlanttia muuttaa, muuten Error,
          // Koska sitten olisi kaksi samanlaista channel_idt?? kasveissa.
          if(allMyPlants[index] === item) {
            // Kasvi on sama kun listan [] arvo, palautus [] arvo eli index
            //console.log("Kasvilla on sama index kun listassa, palautetaan kasvin sijainti index, my??s channel id ")
            return index
          } else {
            // Kasvi ei ole sama kuin listan [] arvo, joten error ettei tule samoja channel_ideit??
            //console.log("Kasvi ei ole sama kun listassa, mutta channel_id sama, Error")
            return "Error"
          }
          
          // Jos kasvilla on sama write_apikey kun valitusta ePlantiss??
        } else if (ePlant.write_apikey === item.ePlantPot.write_apikey ) {

          if(allMyPlants[index] === item) {
            // Jos se on sama kun listan [] luku, voidaan kasvin ePlanttia muuttaa, muuten Error,
            // Koska sitten olisi kaksi samanlaista channel_idt?? kasveissa.
            //console.log("Kasvilla on sama index kun listassa, palautetaan kasvin sijainti index, my??s write_apikey sama ")
            return index
          } else {
            // Kasvi ei ole sama kuin listan [] arvo, joten error ettei tule samoja write_apikeyt??
            //console.log("Kasvi ei ole sama kun listassa, mutta write_apikey sama, Error")
            return "Error"
          }
          
        }
        // Jos valitulla ePlantill?? on sama ID, kun listan kasvin eplantpot palautetaan index
        else if(ePlant.ePlantID === item.ePlantPot.ePlantID) {
          //console.log("Kasvilla on sama ID, Index")
          return index
        } else {
          // Jos kasvilla ei ole samaa ePlant ID, kun valittu ePlant ID, palautetaan null
          //console.log("Kasvin ePlantissa ei ole sama ID, null")
          return null
        }

    })

    // Poistetaan null arvot
    let found = ifFound.filter(i => i !== null)

    // Jos l??ytyy Error, ei tehd?? mit????n muokkauksia!
    if(found.includes("Error")) {
      //console.log("Erroreita l??ytyi, ohjataan takaisin Homeen")
      navigate('Home', {showSnackbar: true, plantName: "You cannot have two ePlants with same channel id or write_apikey!"})
    }  else {
      //console.log("Ei erroreita muokataan ePlant ja Kasvin ePlantPot")
      let foundIndex = found[0]
      let plantID = allMyPlantsWithID[foundIndex]
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

    } 
  }
  })
}


function DeleteUserEPlant(ePlantID, navigate) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {

      let allMyPlants = "";
      let allMyPlantsWithID = "";

    // Haetaan kaikki k??ytt??j??n kasvit
    firebase.database().ref('users/' + user.uid + "/myPlants/").on('value', snapshot => {
      try {
        allMyPlants = Object.values(snapshot.val())
        allMyPlantsWithID = Object.entries(snapshot.val())
      } catch (error) {
        allMyPlants = snapshot.val();
        allMyPlantsWithID = snapshot.val()
      }
      
    })

    // Jos kasveja ei ole poistetaan huoletta ePlant
    if (allMyPlants === null) {
      //console.log("Ei kasveja. Poistetaan pelkk?? ePlant")
      firebase.database().ref('users/' + user.uid + "/ePlant/" + ePlantID).remove()
      navigate('Home', {showSnackbar: true, plantName: "ePlant was deleted!"})

    } else {
      // Kasveja l??ytyi

      // K??yd????n ne l??pi ja tarkistetaan onko niiden ePlantPot sama kuin poistettava ePlant
      let ifSame = allMyPlants.map((item, index) => {
        //console.log(item)
        if (item.ePlantPot.ePlantID === ePlantID) {
          // Jos kasvin ePlanPot on sama kun poistettavan ePlantin
          // Palautetaan index
          return index
        } else {
          // Jos arvo ei ole sama palautetaan "Not same"
          return "Not same"
        }
      })
      
      // Poistetaan Not same arvot, eli ei kasvista ei l??ydy samaa arvoa
      let ePlantPotSame = ifSame.filter((item) => item !== "Not same")
      //console.log(ifSame, ePlantPotSame)

      // Jos listalla on pituutta, poistettava ePlant l??ytyy kasveista.
      if(ePlantPotSame.length = 1) {
        // Poistetaan kasvi sek?? ePlantPot
        let plant = allMyPlantsWithID[ePlantPotSame[0]]
        //console.log(plant[0], "Kasvin ID")
        console.log("Kasvi l??ytyi, jossa sama ePlant. Poistetaan ePlant sek?? kasvi!")
        // Poistetaan ePlant
        firebase.database().ref('users/' + user.uid + "/ePlant/" + ePlantID).remove();
        // Poistetaan kasvi
        firebase.database().ref('users/' + user.uid + "/myPlants/" + plant[0]).remove();

        swal("Poof! ePlant deleted!", {
          icon: "success",
          timer: 2000,
        });

      } else {
        // Jos kasvia listasta ei l??ydy sama ePlantPottia poistetaan pelk??st????n ePlant
        //console.log("Kasvi listasta ei l??ytynyt samaa ePlantti??. Poistetaan pelkk?? ePlant")
        firebase.database().ref('users/' + user.uid + "/ePlant/" + ePlantID).remove();

        swal("Poof! ePlant deleted!", {
          icon: "success",
          timer: 2000,
        });
      }
    } 
      
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