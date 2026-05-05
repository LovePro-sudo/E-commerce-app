import "./category_item.component.scss";

const CategoryItem = ({cat}) => {
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${cat.imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{cat.title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
