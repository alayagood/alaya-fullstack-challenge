import React from "react";
import PropTypes from "prop-types";

const ImageUpload = ({ setSelectedImage, uploadRatio, isLoading }) => {
  const handleImageSelection = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className="d-flex">
      <input type="file" onChange={handleImageSelection} />
      {isLoading && (
        <>
          <div>{uploadRatio}%</div>
          <div className="loader" />
        </>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  setSelectedImage: PropTypes.func.isRequired,
  uploadRatio: PropTypes.number,
  isLoading: PropTypes.bool,
};

export default ImageUpload;
