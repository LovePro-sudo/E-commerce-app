import { useState, useContext } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopUp,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import PopUp from "../pop-up/pop-up.component";
import "./sign-in-form.style.scss";
import { PopUpContext } from "../../contexts/popup.context";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setShowPopUp, setMessage, setTitle, setHasConfirm } = useContext(PopUpContext);

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
      await signInUserWithEmailAndPassword(email, password);
      setMessage("");
      resetFormField();
    } catch (e) {
      console.log(e);
      switch (e.code) {
        case "auth/invalid-credential":
          setShowPopUp(true);
          setMessage("Invalid email or password");
          setTitle("Login Failed");
          setformFields(defaultFormFields);
          setHasConfirm(false)
          break;

        default:
          break;
      }
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <PopUp />
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>

          <Button
            type="button"
            buttonType="google"
            onClick={SignInWithGoogleUser}
          >
            Google Sign In
          </Button>
          {/* <Button
            type="button"
            buttonType="inverted"
            onClick={SignInWithFacebookUser}
          >
            Close
          </Button> */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
