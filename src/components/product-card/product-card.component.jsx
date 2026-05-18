import "./product-card.style.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { InCartContext } from "../../contexts/cart.context";

const ProductCard = ({ products }) => {
  const { addItemToCart } = useContext(InCartContext);
  const { imageUrl, name, price, id } = products;
  const addProductHandler = () => addItemToCart(products);

  return (
    <div className="product-card-container" key={id}>
      <img src={imageUrl} alt={`${name}`}></img>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" type="button" onClick={addProductHandler}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
