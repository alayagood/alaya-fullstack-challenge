import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import AddImage from "./AddImage";
import { addPostRequest } from "../PostActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const PostCreateWidget = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const [uploadRatio, setUploadRatio] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

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
    await dispatch(addPostRequest(state, handleUploadProgress));
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
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
      <TextField
        variant="filled"
        label="Author name"
        name="name"
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        label="Post title"
        name="title"
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        multiline
        rows="4"
        label="Post content"
        name="content"
        onChange={handleChange}
      />
      <AddImage
        setSelectedImage={(image) => updateState("image", image)}
        isLoading={isLoading}
        uploadRatio={uploadRatio}
      />
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit()}
        disabled={!state.name || !state.title || !state.content}
      >
        Submit
      </Button>
    </div>
  );
};

PostCreateWidget.propTypes = {};

export default PostCreateWidget;
