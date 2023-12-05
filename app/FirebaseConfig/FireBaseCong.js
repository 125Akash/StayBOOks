// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase , ref} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBs15XUvWP5LCc5xkI1quA6T5fiR4W131c",
  authDomain: "akashpedia-ebaf8.firebaseapp.com",
  databaseURL: "https://akashpedia-ebaf8-default-rtdb.firebaseio.com",
  projectId: "akashpedia-ebaf8",
  storageBucket: "akashpedia-ebaf8.appspot.com",
  messagingSenderId: "570662685971",
  appId: "1:570662685971:web:1a3158e400b8db86749ee6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const attributesRef = ref(database, 'attributes');
export const addressRef = ref(database, 'address');
export const AriDetailsRef = ref(database, 'aridetails');
