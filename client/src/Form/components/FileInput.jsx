import React, { useState, useEffect  } from "react";
import { useDispatch } from "react-redux";
import { uploadImageRequest } from "../../Post/PostActions";
import { styled } from '@mui/system';
import { Button, CircularProgress, CardMedia } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileInput = ({ selectFile, image }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cloudinaryFile, setCloudinaryFile] = useState(image);
  const dispatch = useDispatch();

  const handleSelectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);

    try {
      const fileResponse = await dispatch(uploadImageRequest(file));
      if (fileResponse.cloudinaryImage) {
        setCloudinaryFile(fileResponse.cloudinaryImage.url);
        selectFile(fileResponse.cloudinaryImage.url);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleRemoveFile = async () => {
    setFile(null);
    setCloudinaryFile(null);
    selectFile('');
  };

  const CloudinaryCard = styled(CardMedia)(() => ({
    maxWidth: "100%", height:"250px", width: "auto", margin:"10px 0", padding: "5px", border: "1px solid #ccc"
  }));

  useEffect(() => {
    if (image !== cloudinaryFile) {
      setFile(null);
      setCloudinaryFile(image);
    }
  }, [image, cloudinaryFile]);
  

  return (
    <div className="fileinput" style={{ marginTop: "30px" }}>
      {file && <center>{file.name}</center>}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {cloudinaryFile && (
          <CloudinaryCard
            component="img"
            src={cloudinaryFile}
            alt="Uploaded"
          />
        )}
      </div>
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
        style={{ display: "none" }}
      />

      {cloudinaryFile ? 
      <Button
          variant="contained"
          color="primary"
          onClick={handleRemoveFile}
          disabled={loading}
          className="text-white"          
          style={{ marginTop: "10px" }}
        >
          Remove Image
        </Button>
      : 
      file ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={loading}
            className="text-white"
            startIcon={loading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
            style={{ marginTop: "10px" }}
          >
            {loading ? "Uploading..." : "Upload to Cloudinary"}
          </Button>
        </>
      ) : (
        <label htmlFor="file">
          <Button
            component="span"
            variant="contained"
            color="primary"
            className="text-white"
            startIcon={<CloudUploadIcon />}
            disabled={loading}
          >
            Select File
          </Button>
        </label>
      )}
    </div>
  );
}

export default FileInput;
