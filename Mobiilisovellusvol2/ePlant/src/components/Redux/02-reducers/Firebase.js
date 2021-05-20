
const firebase = {
    plants:"",
    ePlantModels: "",
    my_Plants:"",
    my_ePlants: "",
    notification: []
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

        case "setUser_Notifications":
            //console.log(payload)
            //console.log(state.notification)
            let combined = [...state.notification, ...payload ];
            let noNull = combined.filter(item => item != "null")
            //console.log(noNull, "nobull");

            let filteredList = noNull.filter( (item, index) => index === noNull.findIndex( elem => elem.time === item.time && elem.plantname === item.plantname && elem.imagesrc === item.imagesrc))
            //console.log(filteredList, "filt");
            //console.log(combined);

            //let data = state.notification.push(payload)
            return { ...state,  notification: filteredList} 
                      
        default: 
            return state
    }
}


export default Database;
