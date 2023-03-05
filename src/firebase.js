import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPgFTDDljLCvzFTtniyl24fVTGwoBZRSk",
  authDomain: "react-tailwind-shorcut.firebaseapp.com",
  projectId: "react-tailwind-shorcut",
  storageBucket: "react-tailwind-shorcut.appspot.com",
  messagingSenderId: "1042597345883",
  appId: "1:1042597345883:web:5583a9300db15ba68f1d7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const login = ({ email, password }) =>{
  return  signInWithEmailAndPassword(auth, email, password);}

export const register = ({email, password}) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const logOut = ()=>{
    return signOut(auth)
}