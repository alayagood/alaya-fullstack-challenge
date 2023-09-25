import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
// Import Actions
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';
import Logo from '../../../logo.svg';
import { Link } from '@material-ui/core';

const PostListPage = () => {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data);
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

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
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px' }} />
          <h1 className="mt-4">
            Alaya Blog
          </h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-6">
          {isAuthenticated ? <PostCreateWidget addPost={handleAddPost} /> : <Link href='/access'>
            Login To Create Posts</Link>}
        </div>
        <div className="col-6">
          <PostList handleDeletePost={handleDeletePost} posts={posts} />
        </div>
      </div>
    </div>
  );
};



export default PostListPage;
