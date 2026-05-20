import { useContext } from "react";
import { CategoriesContext } from "../../contexts/product.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categories } = useContext(CategoriesContext);
  return (
    <div className="category-preview-container">
      {Object.keys(categories).map((title) => {
        const product = categories[title];
        return <CategoryPreview key={title} title={title} products={product} />;
      })}
    </div>
  );
};

export default CategoriesPreview;
