import React, { useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { Button, CircularProgress } from '@material-ui/core';
import callApi from '../../util/apiCaller';
import { makeStyles } from '@material-ui/core/styles';
// Styles
const useStyles = makeStyles(theme => ({
  root: {
    border: '2px dashed #ccc',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease-in-out',
    '&:hover': {
      borderColor: '#007bff',
    },
    '&:focus': {
      outline: 'none',
    },
    '& p': {
      fontSize: '16px',
      color: '#666',
      marginBottom: '10px',
    },
    '& img': {
      display: 'block',
      maxWidth: '100px',
      maxHeight: '100px',
      marginTop: '10px',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '5px'
    },
  }
}));

function ImageUploadWidget({updateImages, images}) {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: async acceptedImages => {
      try {
        setLoading(true);
        const formData = new FormData();
        acceptedImages.forEach(file => {
          formData.append('file', file);
        });
        await callApi('images', 'post', formData, 'formData')
        .then(res => {
          addNewImages(res.images);
        })
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  });

  const removeImage = async (image) => {
    setLoading(true);
    const newImages = [...images];
    const index = newImages.indexOf(image)
    const deletedImage = newImages.splice(index, 1)[0];
    await callApi(`images/${deletedImage.publicId}`, 'delete')
    .then(res => {
      updateImages(newImages);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
    });
    
  }

  function addNewImages(newImages) {
    const updatedImages = images ? [...images, ...newImages] : newImages;
    updateImages(updatedImages);
  }

  const thumbs = images?.map((image, index) => (
    <div className="float-left mr-2" key={image.publicId}>
      <div>
        <img
          src={image.url}
          alt={image.name}
        />
        <Button className="mt-2" variant="contained" color="primary" onClick={(event) => {
            event.stopPropagation();
            removeImage(image);
          }}>
            Remove
        </Button>
      </div>
    </div>
  ));

  return (
    <div {...getRootProps()} className={`${classes.root}`}>
      {loading ? <CircularProgress className='m-auto'/> :
      <><div className='h-100'>
          <input {...getInputProps()} />
          <div className='w-100'>Drag 'n drop or click</div>
          {thumbs}
        </div></>
      }
    </div>
  );
}

export default ImageUploadWidget;