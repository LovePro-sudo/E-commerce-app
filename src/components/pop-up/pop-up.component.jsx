import "./pop-up.style.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { PopUpContext } from "../../contexts/popup.context";
import { InCartContext } from "../../contexts/cart.context";

const PopUp = () => {
  const { showPopUp, setShowPopUp, message, title, hasConfirm, selectedItem } =
    useContext(PopUpContext);
  const { deleteItemFromCart } = useContext(InCartContext);

  const onDeleteItemHandler = () => {
    deleteItemFromCart(selectedItem);
    console.log(selectedItem);
    setShowPopUp(false);
  };

  if (!showPopUp) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>{title}</h2>
        <p className="message">{message}</p>

        {hasConfirm && (
          <Button
            type="button"
            buttonType="default"
            onClick={onDeleteItemHandler}
          >
            Confirm
          </Button>
        )}

        <Button
          type="button"
          buttonType="default"
          onClick={() => setShowPopUp(false)}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default PopUp;
