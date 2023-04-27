import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from '@material-ui/core';

const UploadImageList = ({ images = [], onDelete }) => {

    return (
        <section className="d-flex flex-column">
            {images.map(({ id, name, image, size }) => (
                <div key={`image-${id}`} className="row align-items-center my-1">
                    <div className="col-12 col-lg-3">
                        <img width={100} src={image} alt={name} />
                    </div>
                    <div className='col-12 col-lg-9 align-self-center'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span>{name}</span>
                            <span>{parseFloat(size / 1000000).toFixed(2)}MB</span>
                            <Button color="secondary" onClick={() => onDelete(id)} startIcon={<Icon>close</Icon>}>Delete</Button>
                        </div>
                    </div>
                </div>))}
        </section>
    );
}

UploadImageList.propTypes = {
    images: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default UploadImageList;