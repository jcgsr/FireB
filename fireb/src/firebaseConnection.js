import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


// Your web app's Firebase configuration
let firebaseConfig = {
   apiKey: "AIzaSyBtDtgqfcQEMjWe4D5m8w0oa5ktVV7RJXM",
   authDomain: "reactapp-96f5f.firebaseapp.com",
   databaseURL: "https://reactapp-96f5f.firebaseio.com",
   projectId: "reactapp-96f5f",
   storageBucket: "reactapp-96f5f.appspot.com",
   messagingSenderId: "488724860936",
   appId: "1:488724860936:web:ed9dd78bca5fe816cec1bd",
   measurementId: "G-5M4SZBRHG0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;
