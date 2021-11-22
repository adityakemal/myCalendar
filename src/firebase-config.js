// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNE9WJbT_Eg9jewW0anSjTjyvG8Whj4cE",
  authDomain: "fir-mycalendar-antikode.firebaseapp.com",
  projectId: "fir-mycalendar-antikode",
  storageBucket: "fir-mycalendar-antikode.appspot.com",
  messagingSenderId: "159289586665",
  appId: "1:159289586665:web:54c41928389edc4803d178",
  measurementId: "G-JJJXC83QZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore()