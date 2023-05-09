import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {getUser} from "../../Access/AccessReducer";
import UploadWidget from "../../util/components/CloudinaryUploadWidget";
import ImageList from "./ImageList";
import callApi from "../../util/apiCaller";

import useSelectedImages from "../hooks/useSelectedImages";
import useImages from "../hooks/useImages";

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
  const [state, setState] = useState({name: "", title: "", content: ""});

  const [images, setImages] = useImages();
  const [error, updateError] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedImgs, addSelectedImg, toggleSelectImg] = useSelectedImages();

  const classes = useStyles();

  useEffect(
    function setDefaultAuthorName() {
      if (user) {
        setState((state) => ({...state, name: user.name}));
      }
    },
    [user]
  );

  const submit = () => {
    const resetState = (state) => ({
      ...Object.keys(state).reduce((prev, key) => ({...prev, [key]: ""}), {}),
      name: user.name,
    });

    if (state.name && state.title && state.content) {
      addPost(state).then(() => {
        setState(resetState);
      });
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  function handleOnUpload(error, result, widget) {
    const path = result?.info?.secure_url;
    if (error || !path) {
      updateError(error);
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
        addSelectedImg(path);
      });
  }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
      <TextField
        variant="filled"
        label="Author name"
        name="name"
        onChange={handleChange}
        value={state.name}
        InputLabelProps={{shrink: !!state.name}}
      />
      <TextField
        variant="filled"
        label="Post title"
        name="title"
        onChange={handleChange}
        value={state.title}
      />
      <TextField
        variant="filled"
        multiline
        rows="4"
        label="Post content"
        name="content"
        onChange={handleChange}
        value={state.content}
      />

      <UploadWidget onUpload={handleOnUpload}>
        {({open}) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <Button variant="outlined" onClick={handleOnClick}>
              <i class="bi bi-cloud-arrow-up bi-cloud-arrow-up-lg pr-2"></i>
              Upload Images
            </Button>
          );
        }}
      </UploadWidget>

      {error && <p>{error}</p>}
      {!!images.length && (
        <Button variant="outlined" onClick={() => setModalOpen(true)}>
          Add images to post{" "}
          {!!selectedImgs.length && `(${selectedImgs.length} added)`}
        </Button>
      )}

      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit()}
        disabled={!state.name || !state.title || !state.content}
      >
        Submit
      </Button>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1000,
            backgroundColor: "white",
            border: "2px solid #000",
            padding: 4,
          }}
        >
          <span
            onClick={() => setModalOpen(false)}
            style={{position: "absolute", right: 0, marginRight: 10}}
          >
            <i class="bi bi-x-lg cursorPointer"></i>
          </span>
          <ImageList
            images={images}
            selectedImgs={selectedImgs}
            toggleSelectImg={toggleSelectImg}
            closeModal={() => setModalOpen(false)}
          />
        </Card>
      </Modal>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default PostCreateWidget;
