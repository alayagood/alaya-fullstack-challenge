import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {getUser} from "../../Access/AccessReducer";
import UploadWidget from "../../util/components/CloudinaryUploadWidget";
import ModalContent from "../../util/components/ModalContent";

import ImageList from "./ImageList";
import callApi from "../../util/apiCaller";

import usePost from "../hooks/usePost";
import useImages from "../hooks/useImages";
import useHandleRequestError from "../hooks/useHandleRequestError";

// Import Style

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const PostCreateWidget = ({addPost}) => {
  const {user} = useSelector((state) => getUser(state));

  const [images, setImages] = useImages();
  const {post, updatePost, resetPost, addImgToPost, togglePostImg} = usePost();

  const {error, setError, handleCatchError, resetError} =
    useHandleRequestError();

  const [modalOpen, setModalOpen] = useState(false);

  const classes = useStyles();

  useEffect(
    function setDefaultAuthorName() {
      if (user) {
        updatePost("name", user.name);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  const submit = () => {
    resetError();
    if (post.name && post.title && post.content) {
      addPost(post)
        .then(() => {
          resetPost({name: user.name});
        })
        .catch(handleCatchError);
    }
  };

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    updatePost(name, value);
  };

  function handleOnUpload(error, result, widget) {
    resetError();
    const path = result?.info?.secure_url;
    if (error || !path) {
      setError("Error uploading file.");

      widget.close({
        quiet: true,
      });
      return;
    }

    callApi("images", "post", {
      image: {path},
    })
      .then(() => {
        return callApi("images", "get");
      })
      .then(({images}) => {
        setImages(images);
        addImgToPost(path);
      })
      .catch(handleCatchError);
  }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
      <TextField
        variant="filled"
        label="Author name"
        name="name"
        onChange={handleChange}
        value={post.name}
        InputLabelProps={{shrink: !!post.name}}
      />
      <TextField
        variant="filled"
        label="Post title"
        name="title"
        onChange={handleChange}
        value={post.title}
      />
      <TextField
        variant="filled"
        multiline
        rows="4"
        label="Post content"
        name="content"
        onChange={handleChange}
        value={post.content}
      />

      <UploadWidget onUpload={handleOnUpload}>
        {({open}) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <Button variant="outlined" onClick={handleOnClick}>
              <i className="bi bi-cloud-arrow-up bi-cloud-arrow-up-lg pr-2"></i>
              Upload Images
            </Button>
          );
        }}
      </UploadWidget>

      {!!images.length && (
        <Button variant="outlined" onClick={() => setModalOpen(true)}>
          Add images to post{" "}
          {!!post.images?.length && `(${post.images.length} added)`}
        </Button>
      )}
      <div className="text-center">
        {error && <div className="text-danger mb-3">{error}</div>}
        <Button
          className="mt-4"
          variant="contained"
          color="primary"
          onClick={() => submit()}
          disabled={!post.name || !post.title || !post.content}
        >
          Submit
        </Button>
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent onModalClose={() => setModalOpen(false)}>
          <ImageList
            images={images}
            selectedImgs={post.images}
            toggleSelectImg={togglePostImg}
            closeModal={() => setModalOpen(false)}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default PostCreateWidget;
