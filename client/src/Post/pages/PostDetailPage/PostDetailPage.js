import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import Actions
import { fetchPost, fetchPostImages } from '../../PostActions';
// Import Selectors
import { useParams } from 'react-router-dom';
import ImageViewer from '../../components/ImageViewer';
import { Button, Icon } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export function PostDetailPage() {

  const { cuid } = useParams();
  const post = useSelector(state => state.posts.data.find(currentPost => (currentPost.cuid === cuid)));
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    if (!post) {
      dispatch(fetchPost(cuid));
    }
    if (!post.images) {
      dispatch(fetchPostImages(cuid));
    }
  }, [dispatch, cuid, post]);

  const handleGoBack = () => {
    history.goBack();
  }

  return (
    <div>
      <div className="text-right">
        <Button variant="contained" color="primary" onClick={handleGoBack} startIcon={<Icon>arrow_back</Icon>}>Go back</Button>
      </div>
      {post
        ?
        (<div className="container">
          <div className="row">
            <div className="col-12">
              <h1>{post.title}</h1>
              <p>By {post.name}</p>
              <p>{post.content}</p>
            </div>
          </div>
          <hr className="my-3" />
          <div className="row">
            {post.images && <ImageViewer images={post.images} />}
          </div>
        </div>)
        : (<div>Loading</div>)}
    </div>
  );
}
export default PostDetailPage;
