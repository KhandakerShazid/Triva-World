// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwRe0gHUGPLplp5qDCRuOZCVo12arw-JE",
  authDomain: "trivia-fb035.firebaseapp.com",
  projectId: "trivia-fb035",
  storageBucket: "trivia-fb035.appspot.com",
  messagingSenderId: "1057975322619",
  appId: "1:1057975322619:web:9a8f58117f3809ef5dad5e",
  measurementId: "G-ZW1NZ0R6G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider(); 
export const db = getFirestore(app); 