import axios from "axios";
import {API_URL} from "./apiCaller";

export const imageUploader = async(image) => {
    const uploadData = new FormData()
    uploadData.append("image", image)
    const response = await axios.post(`${API_URL}/upload`, uploadData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}
