import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "../../shared/components/Alert/index";
import AddImage from "./AddImage/index";
import { addPostRequest } from "../PostActions";

const PostCreateWidget = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const [uploadRatio, setUploadRatio] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (success) setShowSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowSuccess(false);
    }, 2000);
  }, [success]);

  const handleUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    if (percent <= 100) {
      setUploadRatio(percent);
    }
  };

  const submit = async () => {
    if (!state.name || !state.title || !state.content) return;
    setIsLoading(true);
    const success = await dispatch(addPostRequest(state, handleUploadProgress));
    console.log(success);
    if (success) setSuccess(true);
    setIsLoading(false);
  };

  const updateState = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    updateState(name, value);
  };

  return (
    <div className={`d-flex flex-column my-4 w-100`}>
      <h3 className="h4 mb-3">New post</h3>
      <TextField
        autoFocus
        name="name"
        className="mb-3"
        variant="outlined"
        label="Author name"
        onChange={handleChange}
      />
      <TextField
        name="title"
        className="mb-3"
        label="Post title"
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        rows="4"
        multiline
        name="content"
        className="mb-3"
        variant="outlined"
        label="Post content"
        onChange={handleChange}
      />
      <AddImage
        isLoading={isLoading}
        uploadRatio={uploadRatio}
        setSelectedImage={(image) => updateState("image", image)}
      />
      <Button
        color="primary"
        className="mt-3"
        variant="contained"
        onClick={() => submit()}
        disabled={!state.name || !state.title || !state.content}
      >
        Submit
      </Button>
      {showSuccess && (
        <Alert severity="success" className="mt-3">
          Your post was submitted
        </Alert>
      )}
    </div>
  );
};

PostCreateWidget.propTypes = {};

export default PostCreateWidget;
