import firebase  from 'firebase/app';
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
  //Initialize the firestore
  export const firestore = firebase.firestore() ;

  export const signInWithGoogle = () => {
    // Initialize Google provider
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    //Asking user to select gmail account in a new pop-up window 
    auth.signInWithPopup(googleProvider);
  };


export const signOut  = () => {
  auth.signOut();
}



  export const createOrGetUserProfileDocuments = async (user) => {
    if(!user) return;

    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    
    if(!snapshot.exist)
    {
      const {displayName , email , photoURL} = user ;

      try{
       const user =  {
         display_name: displayName,
         email,
         photo_url : photoURL,
         created_at : new Date(),
       };
        await userRef.set(user)
      }catch(error) {
        console.log('Error' , error);
      }
    }
    return getUserDocument(user.uid);
};


async function getUserDocument(uid)
{
  if(!uid) return null ;


  try{
    const userDocument  = await firestore.collection('user').doc(uid);
    return userDocument ;

  }catch(error){
    console.log('Error in getUserDocument',error.message);
  }
} 