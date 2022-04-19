import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC2sdXkwg0U-3H04fdUxDdTo5J2yuDTdfA",
    authDomain: "cooking-recipe-77f6c.firebaseapp.com",
    projectId: "cooking-recipe-77f6c",
    storageBucket: "cooking-recipe-77f6c.appspot.com",
    messagingSenderId: "78044926063",
    appId: "1:78044926063:web:ce2caf18922c7cef6e7d9a"
  };

//firebase-init
firebase.initializeApp(firebaseConfig);

//firestore-init
export const projectFirestore = firebase.firestore();
