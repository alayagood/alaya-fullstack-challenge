import React from "react";
import {AdvancedImage} from '@cloudinary/react';
import {getThumbnail, getImage} from "../../util/cloudinary";
import {Box, Modal} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #1ecde2',
    boxShadow: 24,
    p: 4,
};


const ImageGalleryItem = ({itemName, allowExpand}) =>{

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const handleImageClick = (name) => {
        if (allowExpand) setOpen(true);
    }

    return (
        <>
            <AdvancedImage
                cldImg={getThumbnail(itemName)}
                style={ allowExpand ? { cursor: "zoom-in" } : {}}
                onClick={() => handleImageClick(itemName)}
                className="mt-2 mr-md-3"
            />
            <Modal style={{overflow:'scroll'}}
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <AdvancedImage
                        cldImg={getImage(itemName)}
                        className="mt-2 mr-md-3 w-100 h-100"
                    />
                </Box>
            </Modal>
        </>

    );


};

export default ImageGalleryItem;