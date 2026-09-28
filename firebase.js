 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import getFirestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeW7D-ugoBFmI7t8tKG4ZQG4WoBurT_uw",
  authDomain: "ollie-ride-e8bef.firebaseapp.com",
  projectId: "ollie-ride-e8bef",
  storageBucket: "ollie-ride-e8bef.appspot.com",
  messagingSenderId: "897100260977",
  appId: "1:897100260977:web:d2b6bc0c16a3ec79119dd0",
  measurementId: "G-K4R72NHZTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore and export it

