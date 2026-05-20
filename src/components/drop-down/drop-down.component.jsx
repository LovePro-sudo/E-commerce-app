import "./drop-down.style.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { InCartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const CartDropDown = () => {
  const { cartItem, setIsCartOpen } = useContext(InCartContext);
  const closeCart = () => {
    setIsCartOpen(false);
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItem.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Link to="/checkout" onClick={closeCart}>
        <Button>CHECK OUT</Button>
      </Link>
    </div>
  );
};

export default CartDropDown;
