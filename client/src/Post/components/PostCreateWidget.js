import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploadWidget from './ImageUploadWidget';
import { getError } from '../PostReducer';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const PostCreateWidget = ({ addPost }) => {

  const initialState = {
    title: '',
    content: '',
    imageData: ''
  }
  const [state, setState] = useState(initialState);
  const [fileInputState, setFileInputState] = useState('');
  const [err, setErr] = useState('');
  const classes = useStyles();

  const postError = useSelector(getError);

  useEffect(() => {
    if (postError?.type === 'add_post') {
      setErr('Error creating post. Please try later.');
    } else {
      setErr('');
    }
  }, [postError]);

  const submit = (e) => {
    e.preventDefault();
    if (state.title && state.content) {
      addPost(state);
      clearState();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
        ...state,
        [e.target.name]: value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileInputState(e.target.value);
    readFile(file);
  }

  const readFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setState({
        ...state,
        imageData: reader.result
      });
    }
    reader.onerror = () => {
      setErr('Could not read this image. Please try another one.');
    };
  }

  const clearState = () => {
    setState(initialState);
    setFileInputState('');
  };

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100 align-items-center`} >
        <h3>Create new post</h3>
        <TextField
          className={'w-100'}
          variant="filled"
          label="Post title"
          name="title"
          onChange={handleChange}
          value={state.title}
        />
        <TextField
          className={'w-100'}
          variant="filled"
          multiline minRows="4"
          label="Post content"
          name="content"
          onChange={handleChange}
          value={state.content}
        />
        <ImageUploadWidget imageData={state.imageData} handleImage={handleImage} value={fileInputState} />
        { err && <Typography  variant="subtitle1" color="error">{err}</Typography>}
        <Button className="mt-4" variant="contained" color="primary" onClick={(e) => submit(e)} disabled={!state.title || !state.content}>
            Submit
        </Button>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
