// Import the functions you need from the SDKs you need
import {
  initializeApp
} from "firebase/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firbaseSignOut,
  getAuth
} from "firebase/auth";
import {
  getDatabase
} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-n_c_Nv5mTagt10A9NBPDKxE2OiAtZXg",
  authDomain: "react-chat-10312.firebaseapp.com",
  projectId: "react-chat-10312",
  storageBucket: "react-chat-10312.appspot.com",
  messagingSenderId: "581957299332",
  appId: "1:581957299332:web:3e9263bef15b022848a6d1",
  measurementId: "G-TQ0N5DBKJG"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getDatabase();

export const signUp = async (email, pass) => {
  await createUserWithEmailAndPassword(auth, email, pass);
}

export const login = async (email, pass) => {
  await signInWithEmailAndPassword(auth, email, pass);
};

export const signOut = async () => {
  await firbaseSignOut(auth);
}