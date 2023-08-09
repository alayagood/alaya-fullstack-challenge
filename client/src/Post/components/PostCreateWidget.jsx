import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { decodeAuthToken } from '../../Auth/Auth';
import FileInput from '../../Form/components/FileInput';


const StyledContainer = styled('div')(({ theme }) => ({
  root: {
    '& > *': {
        margin: theme.spacing(1),
    },
  },
}));


const PostCreateWidget = ({ addPost }) => {
  const decodedToken = decodeAuthToken();
  const [state, setState] = useState({
    email:  decodedToken?.email ? decodedToken.email : '',
    title: '',
    content: '',
    image: ''
  });
 

  const submit = async () => {
    if (state.email && state.title && state.content) {
      await addPost(state);
      setState(prevState => ({
        ...prevState,
        title: '',
        content: '',
        image: ''
      }));
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectFile = (image) => {
    setState(prevState => ({
      ...prevState,
      image
    }));
  };


  return (
    <StyledContainer className="d-flex flex-column my-4 w-100">
        <h3>Create new post</h3>
        <TextField variant="filled" label="Author email" name="email" onChange={handleChange} value={state.email} disabled={true}/>
        <TextField variant="filled" label="Post title" name="title" onChange={handleChange} value={state.title}/>
        <TextField variant="filled" multiline rows="4" label="Post content" name="content" onChange={handleChange} value={state.content}/>
        <FileInput selectFile={handleSelectFile} image={state.image} />
        <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.email || !state.title || !state.content}>
            Submit
        </Button>
    </StyledContainer>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
