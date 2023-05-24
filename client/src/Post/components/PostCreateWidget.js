import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
// Import Style

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const buttonStyle = {
  color: 'white',
  margin: '10px',
};

const PostCreateWidget = ({ addPost, addImage }) => {

    const [state, setState] = useState({});
    const [image, setImage] = useState({});
    const [imageToShow, setToShowImage] = useState({});
    const [heightImg, setHeightImg] = useState('0px');
    const [heightBox, setHeightBox] = useState('58px');
    const inputFile = useRef(null);
    const classes = useStyles();

  const submit = () => {

    if (state.name && state.title && state.content) {
      addPost(state, image);
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
        ...state,
        [evt.target.name]: value
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage({
        ...image,
        'file': event.target.files[0]
      }); 
      setHeightImg('250px');
      setHeightBox('325px');
      setToShowImage(URL.createObjectURL(event.target.files[0]));

      setState({
        ...state, 
        ['image']: event.target.files[0].name.slice(0,-5)
      });
    }
   }

  const onAddImage = () =>{
    inputFile.current.click();
  }

  const onDeleteImage = () =>{
    setImage(undefined); 
    setToShowImage(undefined);
    setHeightImg('0px');
    setHeightBox('58px');
    setState({
      ...state, 
      ['image']: null
    });

  }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
        <h3>Create new post</h3>
        <TextField variant="filled" label="Author name" name="name" onChange={handleChange} />
        <TextField variant="filled" label="Post title" name="title" onChange={handleChange} />
        <div>
          <div class='box red' style={{ height: heightBox}}>
            <input ref={inputFile} accept=".jpg,.jpeg,.png" style={{display: 'none'}} type="file" onChange={onImageChange}/>
            <Button style={buttonStyle} onClick={onAddImage}>+</Button>
            <Button style={buttonStyle} onClick={onDeleteImage}>Delete</Button>
            <img id="I1" style={{ height: heightImg}} src={imageToShow}/>
          </div>
        </div>
        <TextField variant="filled" multiline rows="4" label="Post content" name="content" onChange={handleChange} />
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
