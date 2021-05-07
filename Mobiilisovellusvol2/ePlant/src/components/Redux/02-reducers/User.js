
const user = ""

const UserDatabase = ( state = user, action) => {
  let payload = action.payload;

    switch(action.type) { 
        
        // Asetaan minun kasvit
        case "setUser":
            //console.log(payload)
            return state = payload
        default: 
            return state
    }
}


export default UserDatabase;
