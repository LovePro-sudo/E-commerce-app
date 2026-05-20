import "./checkout.style.scss";
import { InCartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import CheckOutItem from "../../components/check-out-item/check-out-item.component";
import PopUp from "../../components/pop-up/pop-up.component";

const CheckOutPage = () => {
  const { cartItem, totalPrice } = useContext(InCartContext);

  return (
    <div className="check-out-container">
      <PopUp />

      <div className="check-out-header">
        <div>Product</div>
        <div>Description</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Remove</div>
      </div>

      {cartItem.map((item) => {
        return <CheckOutItem key={item.id} cartItem={item} />;
      })}
      <div className="total-container">
        <span className="value1">Total: </span>
        <span>{totalPrice}$</span>
      </div>
    </div>
  );
};

export default CheckOutPage;
