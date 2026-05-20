// import { useContext } from "react";
// import { CategoriesContext } from "../../contexts/product.context";
// import CategoryPreview from "../../components/categories-preview/categories-preview.component";

import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview";
import "./shop.styles.scss";
import Category from "../category/category";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
