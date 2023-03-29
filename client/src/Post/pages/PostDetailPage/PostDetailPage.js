import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Import Actions
import { fetchPost } from '../../PostActions';

import ImageViewer from '../../components/ImageViewer';
import { Card, Typography } from '@material-ui/core';
import { getError } from '../../PostReducer';

export const PostDetailPage = () => {

  const { cuid } = useParams();
  const [error, setError] = useState('');
  const post = useSelector(state => state.posts.data.find(currentPost => (currentPost.cuid === cuid)));
  const dispatch = useDispatch();
  const postError = useSelector(getError)

  useEffect(() => {
    if (postError?.type === 'fetch_post') {
      setError('Error Fetching Post. Please login or try again later.');
    } else {
      setError('');
    }
  }, [postError]);


  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
  }, []);

  return (post
    ?
      (<Card raise className="container" style={{width: '600px'}}>
        <div className="row">
          <div className="col-12">
            <h1>{post.title}</h1>
            <p>By {post.name}</p>
            <p>{post.content}</p>
            {post.image && <ImageViewer imageData={post.image.url} height="600" />}
          </div>
        </div>
      </Card>)
    : error ? <Typography variant="subtitle1" color="error">{error}</Typography>
      : (<div>Loading</div>)
  );
}
export default PostDetailPage;
