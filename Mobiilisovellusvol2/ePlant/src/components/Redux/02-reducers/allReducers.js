import { combineReducers } from "redux";
import Firebase from "./Firebase"
import User from "./User"

const AllReducers = combineReducers({
  firebase: Firebase,
  user: User
});

export default AllReducers;
