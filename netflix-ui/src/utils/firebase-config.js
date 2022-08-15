import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpYyk_yS2iRD_DpwmY1AtAMZS_O2qW_Do",
  authDomain: "react-netflix-clone-e4641.firebaseapp.com",
  projectId: "react-netflix-clone-e4641",
  storageBucket: "react-netflix-clone-e4641.appspot.com",
  messagingSenderId: "179544905793",
  appId: "1:179544905793:web:4b2a8d6c03a933a6bf8ec0",
  measurementId: "G-TEG0SNSEVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);