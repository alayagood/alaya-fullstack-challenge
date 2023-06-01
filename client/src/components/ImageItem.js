import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'

const ImageItem = ({ imageUrl, imageId, handleDeleteImage, openModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteClick = () => {
    handleDeleteImage(imageId);
  };

  return (
    <div
      className="image-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={imageUrl} alt="Image" className="image" onClick={openModal}/>

      {isHovered && (
        <div className="delete-button">
          <button className="delete-button" onClick={handleDeleteClick}>
            <AiOutlineDelete className="delete-icon" title="delete-img" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageItem;
