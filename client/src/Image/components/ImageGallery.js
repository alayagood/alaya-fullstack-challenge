import React, {useState} from "react";
import {removeImage} from "../../util/cloudinary";
import {RemoveCircleOutlineOutlined} from "@mui/icons-material";
import ImageGalleryItem from "./ImageGalleryItem";
import Loading from "../../Loading";

const removeCircle = {
        position: 'absolute',
        backgroundColor: 'aliceblue',
        borderRadius: '20px',
        right: '5px',
        cursor: 'pointer'
    };

const ImageGallery = ({images, allowEdit, allowExpand, onRemove}) =>{
    const [loading, setLoading] = useState(false);

    const handleRemoveClick = (name) => {
        setLoading(true);
        removeImage(name).then(() => {
            onRemove(name);
            setLoading(false);
        });
    };

    if(!images || images.length === 0) return <></>;

    else {
        return (
            <div className="mt-sm-4">
                { images.map(image =>
                    <span style={{ position: 'relative' }} key={image.name}>
                        {allowEdit &&
                            <RemoveCircleOutlineOutlined
                                color="primary"
                                style={ removeCircle }
                                onClick={() => handleRemoveClick(image.name)}/> }
                        <ImageGalleryItem itemName={image.name} allowExpand={allowExpand} />
                    </span>

                ) }
                <Loading open={loading} />
            </div>
        );

    }

};

export default ImageGallery;