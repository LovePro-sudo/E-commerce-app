import CategoryItem from "../category_item/category_item.component";
import "./directory.component.scss"

const Directory = ({directory}) => {
  return (
    <div className="directory-container">
      {directory.map((category) => {
        return <CategoryItem key={category.id} cat={category} />;
      })}
    </div>
  );
};

export default Directory;
