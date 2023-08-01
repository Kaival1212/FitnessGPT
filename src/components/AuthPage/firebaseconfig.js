import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";


export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fitness-gptt.firebaseapp.com",
  projectId: "fitness-gptt",
  storageBucket: "fitness-gptt.appspot.com",
  messagingSenderId: "799455167688",
  appId: "1:799455167688:web:7f18558ca8bf155d6591fd",
  measurementId: "G-PBTL5M6XW6",
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
