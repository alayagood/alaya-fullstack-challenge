import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "easymde/dist/easymde.min.css";
import PropTypes from "prop-types";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import SimpleMDE from "react-simplemde-editor";
import {
  postFormSelector,
  postsDataSelector,
  updatePostForm,
} from "../../redux/posts";
import { userDataSelector } from "../../redux/user";
import useReduxDebounce from "../../util/useReduxDebounce";
// Import Style

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

// TODO: Create hook to improve readability
const PostCreateWidget = ({ addPost }) => {
  const [images, setImages] = useState([]);
  const formData = useSelector(postFormSelector);
  const userData = useSelector(userDataSelector);
  const { loading } = useSelector(postsDataSelector);

  const classes = useStyles();
  const userName = userData.name || userData.username;
  const [formState, setFormState] = useState(() => formData);

  // Update form in Redux, so we don't lose any progress in form
  useReduxDebounce(formState, updatePostForm);

  const submit = () => {
    if (formData.title.length > 0 && formData.content.length > 0) {
      addPost({ ...formData, images }, images);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleMarkdownChange = (value) =>
    setFormState((prev) => ({ ...prev, content: value }));

  // TODO: Redux does not handle Files correctly, we need a workaround here
  const handleMarkdownImageUpload = useCallback((file, onSuccess, onError) => {
    try {
      const image = URL.createObjectURL(file);
      setImages((prev) => [...prev, { file, image }]);
      setFormState((prev) => ({
        ...prev,
        imagesToAdd: [...prev.imagesToAdd, { file, image }],
      }));
      onSuccess(image);
    } catch (error) {
      console.log(error);
      onError(error);
    }
  }, []);

  const markdownOptions = useMemo(
    () => ({
      autofocus: false,
      uploadImage: true,
      spellChecker: false,
      // TODO: Fix preview image
      previewImagesInEditor: true,
      imageUploadFunction: handleMarkdownImageUpload,
    }),
    [handleMarkdownImageUpload]
  );

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
      <TextField
        disabled
        variant="filled"
        label={userName ? "Author name" : "You need to be authenticated"}
        name="name"
        onChange={handleChange}
        defaultValue={userName}
      />
      <TextField
        variant="filled"
        label="Post title"
        name="title"
        onChange={handleChange}
        defaultValue={formData.title}
      />
      <SimpleMDE
        value={formState.content}
        options={markdownOptions}
        onChange={handleMarkdownChange}
      />
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit()}
        disabled={
          !userName || loading || !formState.title || !formState.content
        }
      >
        Submit
      </Button>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default PostCreateWidget;
