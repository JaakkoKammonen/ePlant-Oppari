import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// initializing firebase object by giving database and project reference
var firebaseConfig = {
  apiKey: "AIzaSyBAWSZS6xINAvWiQGpdQbtoeYc_XNtsgNw",
  authDomain: "eplant-oppari.firebaseapp.com",
  databaseURL: "https://eplant-oppari-default-rtdb.firebaseio.com/",
  projectId: "eplant-oppari",
  storageBucket: "eplant-oppari.appspot.com",
  messagingSenderId: "1068574576044",
  appId: "1:1068574576044:web:c2549c1ff24317f595fe09",
};

firebase.initializeApp(firebaseConfig);

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();