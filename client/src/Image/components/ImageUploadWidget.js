import React, {useRef, useState} from "react";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import {uploadImage} from "../../util/cloudinary";
import Loading from "../../Loading";

const uploadSection = { display: 'flex', alignItems: 'center', marginTop: '2rem' }
const ImageUploadWidget = ({onUpload}) => {
    const [loading, setLoading] = useState(false);

    const imageInputRef = useRef(null);

    const handleIconClick = () => {
        imageInputRef.current.click();
    };

    const handleImageChange = async (event) => {
        setLoading(true);
        const files = Array.from(event.target.files);
        event.target.value = '';

        try {
            const imageUploadPromises = files.map((image) => uploadImage(image));
            const allUploads = await Promise.all(imageUploadPromises);
            const newImages = allUploads.map((res) => ({ name: res.public_id }));
            onUpload(newImages);

            setLoading(false);
        } catch (error) {
            console.error('Error during image upload:', error);
            setLoading(false);
        }
    };


    return (
        <div style={uploadSection}>
            <div>
                <AddPhotoAlternateOutlinedIcon
                    fontSize="large"
                    color="primary"
                    variant="filled"
                    style={{ cursor: 'pointer' }}
                    onClick={handleIconClick}
                />
                <input
                    style={{ display: 'none' }}
                    name="imageRef"
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    multiple
                    onChange={handleImageChange}
                />
            </div>
            <Loading open={loading} />
        </div>
    );
};

export default ImageUploadWidget;