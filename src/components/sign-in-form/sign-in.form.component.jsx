import { useState } from "react";
import {
  signinWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in.style.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInform = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = { ...formFields };

  const signInwithGoogle = async () => {
    const { user } = await signinWithGooglePopup();
    console.log("+++ Popup Auth Response : ", user);
    await createUserDocumentFromAuth(user);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("+++ Signing in with email ", email);
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log("+++ Response : ", user);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for the email.");
          break;
        case "auth/user-not-found":
          alert("Incorrect email.");
          break;
        default:
          console.log("+++ Error signing in with email and password ", error);
          break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInwithGoogle}>
            Sign In with Goggle
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInform;
