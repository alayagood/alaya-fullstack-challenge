import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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


  const submit = () => {
    if (state.name && state.title && state.content) {
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

  const handleMediaUpload = (evt) => {
    if (!evt.target.files || evt.target.files.length === 0) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

        setState({
          ...state,
          media: base64String
        });
    };

    reader.readAsDataURL(evt.target.files[0]);
  }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
        <h3>Create new post</h3>
        <TextField variant="filled" label="Author name" name="name" onChange={handleChange} />
        <TextField variant="filled" label="Post title" name="title" onChange={handleChange} />
        <TextField variant="filled" multiline rows="4" label="Post content" name="content" onChange={handleChange} />
        {
          state.media ?
          <img className="mx-3" src={`data:image/jpeg;base64,${state.media}`} alt="post-media" /> :
          <label htmlFor="upload-photo">
            <input style={{ display: 'none' }} id="upload-photo" name="upload-photo" type="file" onChange={handleMediaUpload} />
              <Button color="secondary" variant="contained" component="span" style={{ width: "100%" }}>
                Upload media
              </Button>
          </label>
        }
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
