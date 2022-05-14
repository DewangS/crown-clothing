import { initializeApp } from 'firebase/app'

import {getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAbEaVwy6MxzByvYWiu6JwD6n22POB5yTs",
    authDomain: "crown-clothing-db-96bbf.firebaseapp.com",
    projectId: "crown-clothing-db-96bbf",
    storageBucket: "crown-clothing-db-96bbf.appspot.com",
    messagingSenderId: "551017067033",
    appId: "1:551017067033:web:12d5932944a5c53d11f088"
  };

  // Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signinWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signinWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
  ) => {

    if (!userAuth) 
    {
        console.log('*** No userAuth value.. returning... ***')
        return;
    }
    
  console.log('+++ userAuth.uid : ',userAuth.uid)
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password)
    return;
    
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  
  console.log('+++ email and password are '+email+' '+password)
  if(!email || !password)
  return;
  
  return await signInWithEmailAndPassword(auth, email, password)
}