// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqsQig2K4JFLJbXREEP4dLP7uZ0MvyDa0",
  authDomain: "q-gen-53adb.firebaseapp.com",
  projectId: "q-gen-53adb",
  storageBucket: "q-gen-53adb.appspot.com",
  messagingSenderId: "415195942895",
  appId: "1:415195942895:web:e5955e2667b6b70b8db01a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);