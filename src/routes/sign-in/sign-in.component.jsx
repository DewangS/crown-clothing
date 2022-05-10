import {
    //auth,
    signinWithGooglePopup, 
    //signinWithGoogleRedirect, 
    createUserDocumentFromAuth} 
    from '../../utils/firebase/firebase.utils'

import SignUpform from '../../components/sign-up-form/sign-up.form.component'

const SignIn = () => {
    /*useEffect(() => {
        (async () => {
          const response = await getRedirectResult(auth);
          if (response) {
              console.log('++ response : ', response)
            const userDocRef = await createUserDocumentFromAuth(response.user);
          }
        })();
      }, []);*/

    const logGoogleUser = async () => {
        const {user} = await signinWithGooglePopup();
        console.log("+++ Popup Auth Response : ", user)
        await createUserDocumentFromAuth(user)
    }
    
    return(
        <div>
        <h1>Sign In</h1>
        <button onClick={logGoogleUser}>Sign In With Google Popup</button>
        <h1>Signup</h1>
        <SignUpform/>
        </div>
        
    )
}

export default SignIn;