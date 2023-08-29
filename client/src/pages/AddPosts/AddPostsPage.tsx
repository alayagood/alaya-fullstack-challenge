import React, { ChangeEvent, useState } from 'react';

import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewPost } from '../../store/actions/Posts/postActions';


const AddPostPage: React.FC = (): JSX.Element => {

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handlePostCreation = async () => {
    await dispatch(createNewPost(title, content));

    history.push('/user-posts');
    
  }

  return (
    <div className="container w-75 post">
       <div className="row mt-5 post__form d-flex flex-column justify-content-center">
       <h2>Create new post</h2>
          <div className="col mt-3 mb-4">
              <FormControl fullWidth>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input 
                  id="title" 
                  type='title' 
                  aria-describedby="title-text"
                  value={title} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  error={false}
                  required 
                />
                <FormHelperText id="name-text"></FormHelperText>
              </FormControl>
          </div>
          <div className="col">
              <FormControl fullWidth>
              <TextareaAutosize
                id="content"
                aria-label="minimum height"
                minRows={5}
                value={content} 
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                placeholder="Content"
              />
              <FormHelperText id="content-text"></FormHelperText>
              </FormControl>
          </div>
          <div className="col d-flex justify-content-center">
            <Button onClick={handlePostCreation} variant="contained" color='primary'>
              Create
            </Button>
          </div>
       </div>
       <div className="mt-5">
        {
         // loginError && <Alert severity="error">{loginError}</Alert>
        }
        
       </div>
    </div>
  )
};

export default AddPostPage;
