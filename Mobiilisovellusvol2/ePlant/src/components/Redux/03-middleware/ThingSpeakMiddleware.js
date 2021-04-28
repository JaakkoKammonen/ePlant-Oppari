import firebase from "../../firebaseConfig"


// Get my plants
function UpdateMyPlants(dispatch) {
firebase.database().ref('omatkasvit/').on('value', snapshot => {
    const plants = Object.values(snapshot.val());
    //console.log(snapshot.val())
    dispatch(setMyPlants(plants))
});
}


export default {

}