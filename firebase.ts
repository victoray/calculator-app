import * as firebase from "firebase";
import "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBG-kg7HNIkpTcDPPFhXP0pDmc6OqqkuK8",
  authDomain: "calculator-f137a.firebaseapp.com",
  databaseURL: "https://calculator-f137a.firebaseio.com",
  projectId: "calculator-f137a",
  storageBucket: "calculator-f137a.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig, "CalculatorApp");
} else {
  firebase.app("CalculatorApp");
}
