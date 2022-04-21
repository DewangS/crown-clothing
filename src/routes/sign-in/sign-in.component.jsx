import {signinWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signinWithGooglePopup();
        console.log("+++ Auth Response : ", user)
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    return(
        <div>
        <h1>Sign In</h1>
        <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
        
    )
}

export default SignIn;