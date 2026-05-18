import { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.style.scss";
import PopUp from "../pop-up/pop-up.component";
import { PopUpContext } from "../../contexts/popup.context";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const { setShowPopUp, setMessage, setTitle } = useContext(PopUpContext);


  const resetFormField = () => {
    setformFields(defaultFormFields);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setShowPopUp(true);
      setTitle("Sign-up Failed");
      setMessage("Password does not match.");
      return;
    }
    try {
      const user = await createAuthUserWithEmailAndPassword(
        email,
        password,
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (e) {
      console.log(e.code);
      switch (e.code) {
        case "auth/email-already-in-use":
          setShowPopUp(true);
          setTitle("Sign-up Failed");
          setformFields(defaultFormFields);
          setMessage("This email is already in use.");
          break;

        case "auth/weak-password":
          setShowPopUp(true);
          setTitle("Sign-up Failed");
          setMessage("Password should be at least 6 characters.");
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
    <div className="sign-up-container">
      <PopUp />
      <h2>Don't have an account?</h2>
      <span>Sign with email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="DisplayName:"
          type="text"
          onChange={onChangeHandler}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password:"
          type="password"
          onChange={onChangeHandler}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
