import DirectoryItem from "../directory_item/directory_item.component";
import "./directory.component.scss"

const Directory = ({directory}) => {
  return (
    <div className="directory-container">
      {directory.map((category) => {
        return <DirectoryItem key={category.id} cat={category} />;
      })}
    </div>
  );
};

export default Directory;
