import {CloudinaryImage} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";

const crypto = require('crypto');
const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImage(image) {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset",uploadPreset);
    data.append("cloud_name", cloudName);

    return fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: data,
        }
    )
        .then((response) => response.json())
        .catch(e => console.log("Error found during image upload: " + e));
}

export function getThumbnail(imageName) {
    return getImage(imageName).resize(fill().width(100).height(100));
}

export function getImage(imageName) {
    return new CloudinaryImage(imageName, { cloudName: cloudName})
        .roundCorners(byRadius(5));
}

export async function removeImage(publicId) {
    const data = new FormData();
    const timestamp = Date.now();
    const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;

    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

    data.append("api_key", apiKey);
    data.append("public_id", publicId);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    return fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        {
            method: "POST",
            body: data,
        }
    )
        .catch(e => console.log("Error found during image destroy: " + e));
}

