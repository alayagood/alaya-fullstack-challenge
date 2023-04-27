import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from '@material-ui/core';

const UploadImageWidget = ({ label = "Upload Images", onChange }) => {
    return (<Button
        className='py-3'
        component="label"
        variant="outlined"
        startIcon={<Icon>upload_file</Icon>}>
        {label}
        <input type="file" accept="image/png, image/gif, image/jpeg" hidden multiple onChange={onChange} onClick={(evt) => evt.target.value = null} />
    </Button>);
}

UploadImageWidget.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default UploadImageWidget;