import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// initializing firebase object by giving database and project reference
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "i",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(firebaseConfig);

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
