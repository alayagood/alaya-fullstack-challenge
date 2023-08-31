import React, { ChangeEvent, useEffect, useState } from 'react';

import { FormControl, InputLabel, Input, FormHelperText, Button, Grid, Card, CardMedia } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewPost } from '../../store/actions/Posts/postActions';
import Loader from '../../components/Loader/Loader';


const AddPostPage: React.FC = (): JSX.Element => {

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [postImg, setPostImg] = useState<FileList | null>(null);
  const [postImgsUrl, setPostImgsUrl] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handlePostCreation = async () => {
    setLoading(true);
    await dispatch(createNewPost(title, content, postImg));
    setLoading(false);
    history.push('/user-posts');
    
  }

  const handleImageField = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files; 

    if (selectedFiles instanceof FileList) {
      setPostImg(selectedFiles);
    }

  };

  useEffect(() => {
    const imgFiles = postImg as FileList;
    if(!imgFiles?.length) {
      return
    } else {
      const imgURLs: string[] = [];
      Array.from(imgFiles).forEach( (img: File) => imgURLs.push(URL.createObjectURL(img)));
        setPostImgsUrl(imgURLs);
      
    }    
  }, [postImg]);

  return (
    <div className="container w-75 post">
       {
        loading && <Loader />
       }
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
              <Button
                variant="contained"
                component="label"
              >
                <AddIcon />
                Upload Post Image
                <input
                  id="post-img"
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={ (e: ChangeEvent<HTMLInputElement>) => handleImageField(e)}
                />
              </Button>
                <FormHelperText id="name-text"></FormHelperText>
              </FormControl>
              {postImgsUrl && <span>Post images preview</span>}

              <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" spacing={0}>
                  {
                    postImgsUrl?.map( (img: string, index: number) => (
                      <Card key={index} sx={{ maxWidth: 345, marginLeft: 2 }}>
                        <CardMedia
                          component="img"
                          alt="preview-img"
                          height="140"
                          image={img}
                        />
                      </Card>
                    ))
                  }
                  </Grid>
                </Grid>
              </Grid>
          </div>
          <div className="col mt-4">
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
    </div>
  )
};

export default AddPostPage;
