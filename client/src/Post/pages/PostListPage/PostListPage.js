import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';
import Logo from '../../../logo.svg';

const PostListPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data);
  const userData = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(fetchPosts());
  },[]);

  const handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      dispatch(deletePostRequest(post));
    }
  };

  const handleAddPost = (post) => {
    dispatch(addPostRequest(post, userData.userName));
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
      <div className="row">
        <div className="col-6">
          <PostCreateWidget addPost={handleAddPost} />
        </div>
        <div className="col-6">
          <PostList handleDeletePost={handleDeletePost} posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
