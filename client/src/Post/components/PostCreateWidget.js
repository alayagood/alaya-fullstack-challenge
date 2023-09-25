import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import Loader from '../../shared/components/Loader/Loader';



const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const PostCreateWidget = ({ addPost }) => {

  const [state, setState] = useState({});
  const classes = useStyles();
  const [imageFile, setImageFile] = useState(null);
  const loading = useSelector(state => state.posts.loading);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const submit = () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (state.name && state.title && state.content) {
      formData.append('name', state.name);
      formData.append('title', state.title);
      formData.append('content', state.content);

      addPost(formData);
    }

    setState({
      name: undefined,
      title: undefined,
      content: undefined
    })
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  if (loading) return <Loader />
  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
      <TextField variant="filled" required label="Author name" name="name" onChange={handleChange} />
      <TextField variant="filled" required label="Post title" name="title" onChange={handleChange} />
      <TextField variant="filled" required multiline minRows="4" label="Post content" name="content" onChange={handleChange} />
      <InputLabel htmlFor="background-image-input">Select background image</InputLabel>
      <input type="file" placeholder="Add Background image" onChange={handleImageChange} />
      <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.name || !state.title || !state.content}>
        Submit
      </Button>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
