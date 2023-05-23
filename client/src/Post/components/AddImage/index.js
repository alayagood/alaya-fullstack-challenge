import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const ImageUpload = ({ setSelectedImage, uploadRatio, isLoading }) => {
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);

  const handleImageSelection = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const { name: fileName, size } = file;
    const fileSize = (size / 1000).toFixed(2);
    setFileName(fileName);
    setFileSize(`${fileSize}KB`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.fileInput}>
        <input type="file" id="file" onChange={handleImageSelection} />
        <label htmlFor="file">
          {!fileName && "Add image"}
          {!!fileName && <span className={styles.fileName}>{fileName}</span>}
          {!!fileSize && <span className={styles.fileSize}>{fileSize}</span>}
        </label>
      </div>
      {isLoading && (
        <>
          <div className={styles.spinner} />
          <div className="ml-2">{uploadRatio}%</div>
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
