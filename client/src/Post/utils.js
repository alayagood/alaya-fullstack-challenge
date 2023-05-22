import axios from "axios";

const cloudName = "djjkn2ubr";
const presetName = "tqwgdpao";

export async function uploadImage(selectedImage, onUploadProgress) {
  const data = new FormData();
  data.append("file", selectedImage);
  data.append("upload_preset", presetName);
  data.append("cloud_name", cloudName);
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      }
    );
    console.log(response.data.url);
    return response.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return undefined;
  }
}
