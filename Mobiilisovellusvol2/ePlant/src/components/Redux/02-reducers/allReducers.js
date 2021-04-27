import { combineReducers } from "redux";
import Firebase from "./Firebase"

const AllReducers = combineReducers({
  firebase: Firebase
});

export default AllReducers;
