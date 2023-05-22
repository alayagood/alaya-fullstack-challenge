import React from "react";
import PropTypes from "prop-types";

const ImageUpload = ({ setSelectedImage }) => {
  const handleImageSelection = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleImageSelection} />
    </div>
  );
};

ImageUpload.propTypes = {
  setSelectedImage: PropTypes.func.isRequired,
};

export default ImageUpload;
