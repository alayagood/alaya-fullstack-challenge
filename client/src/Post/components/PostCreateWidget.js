import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

//Import utils
import { checkIfTokenInLocalStorage, getEmailFromToken } from '../../util/auth';
import { CLOUDINARY_UPLOAD_PRESET_NAME, CLOUDINARY_CLOUD_NAME } from '../../util/cloudinary';

// Import Style
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const PostCreateWidget = ({ addPost }) => {
  const [submitMessage, setSubmitMessage] = useState('Submit');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const user = useSelector((x) => x.user);
  const isValidToken = checkIfTokenInLocalStorage(user);
  const email = getEmailFromToken(isValidToken);

  const [state, setState] = useState({});
  const classes = useStyles();

  const submit = () => {
    if (state.title && state.content) {
      let newState = { ...state, name: email };
      addPost(newState);
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const uploadImage = async (e) => {
    setIsButtonDisabled(true);
    setSubmitMessage('Uploading image...');
    let files = e.target.files;
    let data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET_NAME);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
      method: 'POST',
      body: data,
    });

    await res.json().then((data) => {
      setSubmitMessage('submit');
      setIsButtonDisabled(false);
      setState((state) => ({ ...state, photoUrl: data.url }));
    });
  };

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      {email ? (
        <>
          <h3>Create new post</h3>
          <TextField variant="filled" label="Post title" name="title" onChange={handleChange} />
          <TextField variant="filled" multiline rows="4" label="Post content" name="content" onChange={handleChange} />
          <Button variant="contained" color="secondary" component="label">
            Upload a photo
            <input type="file" hidden={true} accept={'image/*'} multiple={false} name="image" onChange={uploadImage} />
          </Button>
          <Button
            className="mt-4"
            variant="contained"
            color="primary"
            onClick={submit}
            disabled={!state.title || !state.content || isButtonDisabled}
          >
            {submitMessage.toUpperCase()}
          </Button>
        </>
      ) : (
        <Typography variant="h6">Login to create a new post</Typography>
      )}
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default PostCreateWidget;
