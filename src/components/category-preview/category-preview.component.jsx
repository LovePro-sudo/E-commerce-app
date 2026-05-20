import "./category-preview.styles.scss";
import { Outlet, Link } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title}>
          <span className="title">{title.toUpperCase()}</span>
        </Link>
      </h2>

      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((item) => {
            return <ProductCard key={item.id} products={item} />;
          })}
      </div>
    </div>
  );
};

export default CategoryPreview;
