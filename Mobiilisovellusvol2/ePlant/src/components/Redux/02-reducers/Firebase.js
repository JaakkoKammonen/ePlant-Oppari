
const firebase = { 
    myPlants:"",
    plants:"",
    pots: "",
    ePlantModels: ""
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
            return { ...state,  plants: payload}
            
        // Asetaan ruukut
        case "setPots":
            //console.log(payload)
            return { ...state,  pots: payload}
            
        case "setePlantModels":
            //console.log(payload)
            return { ...state,  ePlantModels: payload}  
        default: 
            return state
    }
}


export default Database;
