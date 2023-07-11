import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploadWidget from "../../Image/components/ImageUploadWidget";
import ImageGallery from "../../Image/components/ImageGallery";


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const PostCreateWidget = ({ addPost }) => {

    const [state, setState] = useState({images: []});
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

    const handleImageChange = (images) => {
        setState({
            ...state,
            images: [...state.images , ...images]
        })
    };

    const handleImageRemoval = (imageName) => {
        setState({
            ...state,
            images: state.images.filter(images => images.name !== imageName)
        });
    }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
        <h3>Create new post</h3>
        <TextField variant="filled" label="Author name" name="name" onChange={handleChange} />
        <TextField variant="filled" label="Post title" name="title" onChange={handleChange} />
        <TextField variant="filled" multiline minRows="4" label="Post content" name="content" onChange={handleChange} />
        <ImageUploadWidget onUpload={handleImageChange} />
        <ImageGallery images={state.images} allowEdit="true" onRemove={handleImageRemoval}/>
        <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.name || !state.title || !state.content}>
            Submit
        </Button>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func
};

export default PostCreateWidget;
