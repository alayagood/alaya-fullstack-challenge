import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, TextField, Button } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import ReactQuill from 'react-quill';
import QuillToolbar, { modules, formats } from "./EditorToolbar";
import 'react-quill/dist/quill.snow.css';
// Import Components
import ImageUploadWidget from '../../common/components/ImageUploadWidget';
// Import Style
const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        }
    },
    quill: {
      '& > *': {
        minHeight: '200px'
      }
    }
}));

const PostCreateWidget = ({ addPost, loading }) => {

  const [state, setState] = useState({
    name: '',
    title: '',
    content: '',
    images: []
  });
  const classes = useStyles();

  const submit = () => {
    if (state.name && state.title && state.content) {
      addPost(state);
      resetState();
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
        ...state,
        [evt.target.name]: value
    });
  };

  const handleEditorChange = (value) => {
    if(value !== '<p><br></p>'){ // Default value when clearing editor
      setState({
        ...state,
        content: value
      });
    }
  };

  const resetState = () => {
    setState({
      name: '',
      title: '',
      content: '',
      images: []
    });
  }

  const handleUpdateImages = (images) => {
    setState({
      ...state,
      images: images
    });
  }

  return (
    <div className={`${classes.root} d-flex flex-column w-100`}>
        <h3 className='mt-4'>Create new post</h3>
        <TextField variant="filled" label="Author name" name="name" onChange={handleChange} value={state.name || ''} />
        <TextField variant="filled" label="Post title" name="title" onChange={handleChange} value={state.title || ''} />
        <QuillToolbar />
        <ReactQuill className={`${classes.quill}`}
          theme="snow"
          name="content"
          value={state.content || ''}
          onChange={handleEditorChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
        />
        <h4>Media</h4>
        <ImageUploadWidget updateImages={handleUpdateImages} images={state.images}/>
        { loading ? <CircularProgress className="m-auto" />
          :
          <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.name || !state.title || !state.content || loading}>
            Submit
          </Button>
        }
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
