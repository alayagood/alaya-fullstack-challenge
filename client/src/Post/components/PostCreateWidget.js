import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UploadImageWidget from './UploadImageWidget';
import { v4 as uuid } from 'uuid';
import { parseImageToBase64 } from '../../util/images';
import UploadImageList from './UploadImageList';
import { useSelector } from 'react-redux';

// Import Style
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const MAX_FILE_SIZE = 5000000;
const defaultState = { title: '', content: '', images: [], isSubmiting: false };

const PostCreateWidget = ({ addPost }) => {

  const [state, setState] = useState(defaultState);
  const posts = useSelector(state => state.posts.data);

  const classes = useStyles();
  const isOverSized = state.size > MAX_FILE_SIZE;

  useEffect(() => {
    handleCleanForm();
  }, [posts]);

  const submit = () => {
    if (state.title && state.content) {
      setState({ ...state, isSubmiting: true });
      addPost(state);
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleUploadImage = useCallback(async (evt) => {
    if (!evt.target.files) {
      return;
    }

    const { files } = evt.target;
    const images = [];
    for (let i = 0; i < files.length; i++) {
      const image = await parseImageToBase64(files[i]);
      images.push({ id: uuid(), name: files[i].name, image, size: files[i].size });
    }

    setState({ ...state, images, size: images.reduce(((a, b) => a + b.size), 0) })
  }, [state, setState]);

  const handleDeleteImage = (id) => {
    setState({
      ...state,
      images: state.images.filter(image => image.id !== id)
    })
  }

  const handleCleanForm = () => {
    setState(defaultState);
  }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
      <TextField variant="filled" label="Post title" name="title" onChange={handleChange} value={state.title} />
      <TextField variant="filled" multiline rows="4" label="Post content" name="content" onChange={handleChange} value={state.content} />

      <UploadImageList images={state.images} onDelete={handleDeleteImage} />
      {isOverSized && <span className='text-danger'>The filesize should not exceed {parseInt(MAX_FILE_SIZE / 100000)}MB</span>}
      <UploadImageWidget onChange={handleUploadImage} />

      {state.isSubmiting ?
        <div className="d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <span className="ml-2">Saving...</span>
        </div>
        :
        <Button className="mt-4" variant="contained" color="primary" type="submit" onClick={submit} disabled={!state.title || !state.content || isOverSized}>
          {state.isSubmiting ? "Saving" : "Submit"}
        </Button>
      }

    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
