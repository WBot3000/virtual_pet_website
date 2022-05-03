// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi7lB_2hKM7ZGG7J2PdgD_ZI5nOfEpLCY",
  authDomain: "web-programming-ii.firebaseapp.com",
  projectId: "web-programming-ii",
  storageBucket: "web-programming-ii.appspot.com",
  messagingSenderId: "78768471136",
  appId: "1:78768471136:web:1eaef87e1aaea2a5e01705",
  measurementId: "G-Z64LDEMCT7"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

export default firebase