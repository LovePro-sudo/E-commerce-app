import "./check-out-item.style.scss";
import { useContext } from "react";
import { InCartContext } from "../../contexts/cart.context";
import { PopUpContext } from "../../contexts/popup.context";
import { FaTrash, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const CheckOutItem = ({ cartItem }) => {
  const { addItemToCart, removeItemFromCart } = useContext(InCartContext);

  const { imageUrl, name, quantity, price } = cartItem;

  const { setShowPopUp, setMessage, setTitle, setHasConfirm, setSelectedItem } =
    useContext(PopUpContext);

  const itemPrice = price * quantity;

  const removeItemHandler = () => {
    removeItemFromCart(cartItem);
  };

  const addItemHandler = () => {
    addItemToCart(cartItem);
  };

  return (
    <div className="item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>

      <span className="name">{name}</span>

      <span className="quantity">
        <button onClick={removeItemHandler}>
          <FaAngleLeft />
        </button>

        <span className="value">{quantity}</span>

        <button onClick={addItemHandler}>
          <FaAngleRight />
        </button>
      </span>

      <span className="price">{itemPrice}</span>

      <div className="remove-button">
        <button
          onClick={() => {
            setShowPopUp(true);
            setTitle("Info");
            setMessage(`Confirm remove ${name} from cart?`);
            setHasConfirm(true);
            setSelectedItem(cartItem);
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CheckOutItem;
