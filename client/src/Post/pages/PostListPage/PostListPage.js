import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
import { getError } from '../../PostReducer';
// Import Actions
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';
import Logo from '../../../logo.svg';

const PostListPage = ({ showAddPost }) => {

  const dispatch = useDispatch();
  const [err, setErr] = useState('');

  const posts = useSelector(state => state.posts.data);
  const postError = useSelector(getError);

  useEffect(() => {
    if (postError?.type === 'fetch_posts') {
      setErr('There was an error fetching your posts. Please try later.');
    } else if (postError?.type === 'delete_post') {
      setErr('There was an error deleting your post. Please try later.');
    } else {
      setErr('');
    }
  }, [postError]);

  useEffect(() => {
    dispatch(fetchPosts());
  },[]);

  const handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      dispatch(deletePostRequest(post));
    }
  };

  const handleAddPost = (post) => {
    dispatch(addPostRequest(post));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
          <h1 className="mt-4">
             Alaya Blog
          </h1>
        </div>
      </div>
      <hr />
      { err && <Typography  variant="subtitle1" color="error">{err}</Typography>}
      <div className="row">
        <div className="col-6">
          <PostCreateWidget addPost={handleAddPost} showAddPost={showAddPost} />
        </div>
        <div className="col-6">
          <PostList handleDeletePost={handleDeletePost} posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
