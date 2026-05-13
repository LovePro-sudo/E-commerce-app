import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopUp,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.style.scss";
import { VertexAIBackend } from "firebase/ai";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [errorNotif, setErrorNotif] = useState("");

  const SignInWithGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  const resetFormField = () => {
    setformFields(defaultFormFields);
  };

  const signInSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await signInUserWithEmailAndPassword(email, password);
      console.log(response);
      setErrorNotif("")
      resetFormField();
    } catch (e) {
      console.log(e)
      if(e.code === "auth/invalid-credential"){
        setErrorNotif("Incorrect email or password")
      }
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={signInSubmitHandler}>
        <FormInput
          label="Email:"
          type="email"
          onChange={onChangeHandler}
          name="email"
          value={email}
        />
        <FormInput
          label="Password:"
          type="password"
          onChange={onChangeHandler}
          name="password"
          value={password}
        />
        <p>{errorNotif}</p>
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={SignInWithGoogleUser}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
