
const firebase = {
    plants:"",
    ePlantModels: "",
    my_Plants:"",
    my_ePlants: ""
 };

const Database = ( state = firebase, action) => {
  let payload = action.payload;

    switch(action.type) { 
        
        // Asetaan minun kasvit
        case "setUser_Plants":
            //console.log(payload)
            return { ...state, my_Plants : payload}

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
        case "setUser_ePlants":
        //console.log(payload)
            return { ...state,  my_ePlants: payload} 
            
        default: 
            return state
    }
}


export default Database;
