import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// Import Style
const useStyles = makeStyles(theme => ({
    squareContainer: {
        aspectRatio: "1/1"
    },
    image: {
        objectFit: 'cover'
    }
}));

const ImageViewer = ({ images = [] }) => {
    const classes = useStyles();

    return (

        <section className="row w-100">
            {images.map(image =>
                <div key={`image-${image._id}`} className="col-lg-4 col-md-12 pb-4 mb-lg-0">
                    <div className={classes.squareContainer}>
                        <img
                            alt='Gallery'
                            className={`${classes.image} shadow-1-strong rounded mb-4`}
                            src={image.url}
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
            )
            }
        </section >
    );
}

ImageViewer.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageViewer;