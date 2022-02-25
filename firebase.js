// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGOD4-Cw03BVKwPF93VZQC6Gscz3qB1ns",
  authDomain: "reels-next-79e6e.firebaseapp.com",
  projectId: "reels-next-79e6e",
  storageBucket: "reels-next-79e6e.appspot.com",
  messagingSenderId: "945000765099",
  appId: "1:945000765099:web:84376c9ea90676135f09ee",
  measurementId: "G-EYHK4RST86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Authentication
const auth=getAuth();
//Storage
const storage=getStorage(); 
//DataBase
const db=getFirestore();

export {auth,storage,db};
export default app;