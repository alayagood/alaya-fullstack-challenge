import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function ImageUpload({ onImgURL }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dxmr8i6pr',
        uploadPreset: 'jaqszp0g',
      },
      (err, result) => {
        if (result.event && result.event === 'success') {
          const imageURL = result.info.url;
          onImgURL(imageURL);
        }
      },
    );
  }, [onImgURL]);

  return (
    <Button
      className="mt-4"
      variant="contained"
      color="primary"
      onClick={() => {
        widgetRef.current.open();
      }}
    >
      Upload
    </Button>
  );
}

ImageUpload.propTypes = {
  onImgURL: PropTypes.func.isRequired,
};

export default ImageUpload;
