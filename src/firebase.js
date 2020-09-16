import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAnGeLGM91AcO6PWzIeCncP-13jMTpJZyw",
    authDomain: "react-slack-clone-6c61f.firebaseapp.com",
    databaseURL: "https://react-slack-clone-6c61f.firebaseio.com",
    projectId: "react-slack-clone-6c61f",
    storageBucket: "react-slack-clone-6c61f.appspot.com",
    messagingSenderId: "983597321251",
    appId: "1:983597321251:web:a21b5c2540e1d435cb7596"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 //Initialize our authentication
  export const auth = firebase.auth() ;

  export const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleProvider);
  }