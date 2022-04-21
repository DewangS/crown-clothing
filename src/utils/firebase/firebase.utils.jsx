import { initializeApp } from 'firebase/app'

import {getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider} from 'firebase/auth'

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
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signinWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)
    
    if (!userSnapshot.exists()) {
        
        const {displayName, email} = userAuth
        const createdAt = Date()
        try {
            const newUserDoc = await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
            console.log('++ newUserDoc : ', newUserDoc)
            return newUserDoc
        } catch (error) {
            console.log('++ Error creating the user  : ', error.message)
        }
        
        
    }
    return userDocRef
}