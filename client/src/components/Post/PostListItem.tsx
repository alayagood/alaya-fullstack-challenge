import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { Link, useLocation } from 'react-router-dom'

import { IPost } from '../../interfaces/Post';
import { excerptCreator } from '../../utils/exerptCreator';
import storageService from '../../services/storage/storageService';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert } from '@mui/material';
import postService from '../../services/posts/postsService';
import { useDispatch } from 'react-redux';
import { removePost } from '../../store/actions/Posts/postActions';

import './PostListItem.css'

interface IPostListItemProps {
  post: IPost;
}

const PostListItem: React.FC<IPostListItemProps> = ({ post }): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [errorOnDeletePost, setErrorOnDeletePost] = useState<boolean>(false);
  const userIsLogged: boolean = Boolean(storageService.get('session', 'isAuthenticated'));
  const location = useLocation();
  const dispatch = useDispatch();

  const { title, content, by, cuid, slug } = post;

  const handleDialogClickOpen = (): void => {
    setOpen(true);
  };

  const handleDialogClose = (): void => {
      setOpen(false);
  };

  const handleDeletePost = async (cuid: string = ''): Promise<void> => {

      const postDeleted = await postService.deletePost('posts/post', cuid);
      if(postDeleted && 'error' in postDeleted) {
        setErrorOnDeletePost(true)
      } else {
        dispatch(removePost(cuid));
      } 
    
      handleDialogClose();

  }

  return (
    <>
    <Card sx={{ minWidth: 275 }}>
      <div className="post-content">
        <div className="post-content__img">
        {
            post && post.images 
            ?
              <img src={post.images[0]} alt="" />
            :
            ''
          }
        </div>
        <div className="post-content__text">
            <CardContent>
            <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
              {title}
            </Typography>
            <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
              By:  {by?.name}
            </Typography>
            <Typography variant="body2">
              { excerptCreator(content, 150) }
            </Typography>
          </CardContent>
          <CardActions  
          sx={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            p: 3,
          }}
          >
            <Link to={`/post-detail/${slug}/${cuid}`}>
              <Button className='mr-2' color='secondary' variant='contained' size="small">
                <StickyNote2Icon />
                Read More
              </Button>
            </Link>
            {
              userIsLogged 
              &&
              location.pathname !== '/'
              && 
              <Button onClick={() => handleDialogClickOpen()} color='warning' variant='contained' size="small">
                <DeleteOutlineIcon />
                Delete
              </Button>
            }
            </CardActions>
          
        </div>
      </div>
      </Card>
      
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"Delete post"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleDialogClose}>No</Button>
        <Button onClick={() => handleDeletePost(cuid)} autoFocus>
            Yes
        </Button>
        </DialogActions>
      </Dialog>

      <div className="mt-3">
        {
          errorOnDeletePost && <Alert severity="error">Post cannot be deleted, please try again.</Alert>
        }
        
       </div>
  </>
  );
}

export default PostListItem;