// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY , 
  authDomain: "e-learning-57d73.firebaseapp.com",
  projectId: "e-learning-57d73",
  storageBucket: "e-learning-57d73.appspot.com",
  messagingSenderId: "145801809896",
  appId: "1:145801809896:web:1feb01f5aec57746f25e5d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);