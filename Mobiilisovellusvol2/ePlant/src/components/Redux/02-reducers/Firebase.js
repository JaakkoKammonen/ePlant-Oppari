
const firebase = { 
    myPlants:"",
    plants:"",
    pots: ""
 };

const Database = ( state = firebase, action) => {
  let payload = action.payload;

    switch(action.type) { 
        
        // Asetaan minun kasvit
        case "setMyPlants":
            //console.log(payload)
            return { ...state, myPlants : payload}

        // Asetaan info-kasvit
        case "setPlants":
            //console.log(payload)
            return { ...state,  plants: payload}
            
        // Asetaan ruukut
        case "setPots":
            //console.log(payload)
            return { ...state,  pots: payload}
    
           
        default: 
            return state
    }
}


export default Database;
