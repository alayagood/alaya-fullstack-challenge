import React from 'react';
import { Card, CardMedia } from '@material-ui/core';

const ImageViewer = ({ imageData, height }) => {

    return (
        <Card
            raised
            style={{width: 'fit-content'}}
        >
            <img
                src={imageData}
                height={height}
                width={height}
                sx={{ padding: "10px 10px 0 10px", objectFit: "cover"}}
            />
        </Card>
    )
}

export default ImageViewer;