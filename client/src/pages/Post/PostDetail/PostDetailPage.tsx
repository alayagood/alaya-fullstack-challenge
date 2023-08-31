import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Import Selectors
import { useParams } from 'react-router-dom';
import { IPostState } from '../../../interfaces/PostState';
import { IPost } from '../../../interfaces/Post';
import { Card, CardContent, Divider, ImageList, ImageListItem, Typography } from '@mui/material';
import postService, { IErrorResponse } from '../../../services/posts/postsService';

import './PostDetailPage.css'

interface postUrlParams {
  slug?: string;
  cuid?: string;
}

const PostDetailPage: React.FC = (): JSX.Element => {

  const [post, setPost] = useState<IPost>();
  const [postError, setPostError] = useState<IErrorResponse>();
  const postStore = useSelector((state: IPostState) => state.posts);
  const params: postUrlParams = useParams();
  const postImages = post && post.images ? post.images : [];

  const getPost = async () => {
    try {
      const postRequest = await postService.getPostByCuid('posts/post', params.cuid);
      if('title' in postRequest) {
        setPost(postRequest);
      }
      
    } catch (error) {
      setPostError(postError)
    } 
    
  }

  useEffect(() => {

    if(postStore.user_posts?.length) {
      setPost(postStore.user_posts.filter((post: IPost) => post.cuid === params?.cuid)[0]);
    } else {
      if(!post) {
        getPost();
      }
    }

  }, [postStore.posts, post, params?.cuid])

  return (
    <div className="container post-detail">
      <h2 className='mb-3'>{post?.title}</h2>
      <hr />
      <Card>
        {
          postImages.length 
            ?
          <div className="post-detail__img">
              <img src={postImages[0]} alt="Post image" />
          </div>
          :
          ''
        }
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <strong>Author:</strong> {post?.by?.name}
          </Typography>
          <Divider />
          <div className="post-detail__content mt-4 mb-4">
            {post?.content}
          </div>
          
          {postImages.length 
            ? 
            <>
            <Divider />
            <h4>Post images</h4> 
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              { 
                postImages.map((img) => (
                <ImageListItem key={img}>
                  <img
                    src={`${img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt='post-detaik_image'
                    loading="lazy"
                  />
                </ImageListItem>
                ))
              }
            </ImageList>
            </>
          : 
          ''
          }

        </CardContent>
      </Card>
    </div>
  );
}
export default PostDetailPage;
