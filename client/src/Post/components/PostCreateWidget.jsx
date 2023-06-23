import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ImageUpload from './ImageUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function PostCreateWidget({ addPost }) {
  const [state, setState] = useState({});
  const [imageURL, setImageURL] = useState(
    'https://res.cloudinary.com/dxmr8i6pr/image/upload/v1687169245/h3sroghohmid6r84t9i9.jpg',
  );
  const classes = useStyles();

  const submit = () => {
    if (state.name && state.title && state.content) {
      addPost({ ...state, imgURL: imageURL });
    }
  };

  const handleChange = (evt) => {
    const { value } = evt.target;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleImgURL = useCallback((imgURL) => {
    setImageURL(imgURL);
  }, []);

  return (
    <div className={`${classes.root} d-flex flex-column my-1 w-100`}>
      <h3>Create new post</h3>
      <TextField variant="filled" label="Author name" name="name" onChange={handleChange} />
      <TextField variant="filled" label="Post title" name="title" onChange={handleChange} />
      <TextField
        variant="filled"
        multiline
        rows="4"
        label="Post content"
        name="content"
        onChange={handleChange}
      />
      <ImageUpload onImgURL={handleImgURL} />
      <Button
        className="mt-2"
        variant="contained"
        color="primary"
        onClick={() => submit()}
        disabled={!state.name || !state.title || !state.content}
      >
        Submit
      </Button>
    </div>
  );
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default PostCreateWidget;
