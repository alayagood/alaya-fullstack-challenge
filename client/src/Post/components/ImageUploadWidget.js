import React from 'react';
import ImageViewer from './ImageViewer';
import { Button } from '@material-ui/core';

const ImageUploadWidget = ({ imageData, handleImage, value }) => {
    return (
        <section>
            {imageData && <ImageViewer imageData={imageData} height="300" />}
            <input onChange={handleImage}
            type="file"
            accept="image/*"
            id="select-image"
            className='form-control'
            style={{ display: "none" }}
            value={value}
            />
            <label htmlFor="select-image">
                <Button

                    variant="outlined"
                    className="mt-4"
                    color="secondary"
                    component="span"
                    size="large"
                    fullWidth={true}
                >
                    Upload a Photo
                </Button>
            </label>
        </section>
    )
}

export default ImageUploadWidget;