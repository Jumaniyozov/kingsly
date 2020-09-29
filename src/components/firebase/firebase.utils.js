import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbGdn3l6I6yVSwmmPsKwaLKotInpn-dGk",
  authDomain: "kingsly-502e0.firebaseapp.com",
  databaseURL: "https://kingsly-502e0.firebaseio.com",
  projectId: "kingsly-502e0",
  storageBucket: "kingsly-502e0.appspot.com",
  messagingSenderId: "78213180352",
  appId: "1:78213180352:web:470139f52b7ff866e2f625",
  measurementId: "G-C737611FPQ",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;