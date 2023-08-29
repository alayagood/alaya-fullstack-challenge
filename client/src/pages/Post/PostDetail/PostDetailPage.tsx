import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Import Selectors
import { useParams } from 'react-router-dom';
import { IPostState } from '../../../interfaces/PostState';
import { IPost } from '../../../interfaces/Post';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import postService, { IErrorResponse } from '../../../services/posts/postsService';

interface postUrlParams {
  slug?: string;
  cuid?: string;
}

const PostDetailPage: React.FC = (): JSX.Element => {

  const [post, setPost] = useState<IPost>();
  const [postError, setPostError] = useState<IErrorResponse>();
  const postStore = useSelector((state: IPostState) => state.posts);
  const params: postUrlParams = useParams();

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
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <strong>Author:</strong> {post?.by?.name}
          </Typography>
          <Divider />
          <div className="post-detail__content mt-4">
            {post?.content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default PostDetailPage;
