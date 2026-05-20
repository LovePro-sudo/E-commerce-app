import "./directory_item.component.scss";

const DirectoryItem = ({ cat }) => {
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${cat.imageUrl})` }}
      />
      <div className="directory-item-body">
        <h2>{cat.title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
