import { useState } from "react";
import {createAuthUserWithEmailAndPassword,
createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-up.style.scss'
import Button from '../button/button.component'

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};



const SignUpform = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = { ...formFields };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
        alert("Passwords don't match.")
        return
    }
    try {
        const {user} = await createAuthUserWithEmailAndPassword(email, password)
        console.log('+++ user : ', user)
        await createUserDocumentFromAuth(user, { displayName })
        resetFormFields();
        
      } catch (error) {
      if (error.code==="auth/email-already-in-use") {
        alert('Can not create user. Email already in use')
      }
       console.log('Error Creating user', error) 
    }
    
}

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]:value})
  };

  return (
    <div className="sign-up-container">
    <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput 
          label="Display Name"
          name="displayName"
          type="text"
          value={displayName}
          required
          onChange={handleChange}
        ></FormInput>
        
        <FormInput 
         label="Email"
          type="email"
          name="email"
          value={email}
          required
          onChange={handleChange}
        ></FormInput>
        
        <FormInput 
          label="Password"
          type="password"
          name="password"
          value={password}
          required
          onChange={handleChange}
        ></FormInput>
        
        <FormInput 
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          required
          onChange={handleChange}
        ></FormInput>
        <Button>Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpform;
