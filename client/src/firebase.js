// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//temporary souls firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-travel-tourism.firebaseapp.com",
  projectId: "mern-travel-tourism",
  storageBucket: "mern-travel-tourism.appspot.com",
  messagingSenderId: "304378877141",
  appId: "1:304378877141:web:3bddab2778ca23186f7e5c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
