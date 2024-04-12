// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi6zh83GG7L2g8oO-pvn-ZHiNoS-WwuU8",
  authDomain: "ecomers85-aa1ca.firebaseapp.com",
  projectId: "ecomers85-aa1ca",
  storageBucket: "ecomers85-aa1ca.appspot.com",
  messagingSenderId: "625428373979",
  appId: "1:625428373979:web:9ebf98a4f30b45f4b347fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app);

export const login = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const register = ({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return signOut(auth);
};