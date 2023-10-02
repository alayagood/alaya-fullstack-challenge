import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
// Import Actions
import {
  addPostRequest,
  deletePostRequest,
  fetchPosts,
} from '../../PostActions';
import Logo from '../../../logo.svg';
import { Redirect } from 'react-router-dom';

const selectRedirectTo = (state) => state.nav.redirectTo;

const PostListPage = ({ cookies }) => {
  const dispatch = useDispatch();
  const redirectTo = useSelector(selectRedirectTo);
  const posts = useSelector((state) => {
    return state.posts.data;
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDeletePost = (post) => {
    if (window.confirm('Do you want to delete this post')) {
      // eslint-disable-line
      dispatch(deletePostRequest(post, cookies.auth));
    }
  };

  const handleAddPost = (post) => {
    dispatch(addPostRequest(post, cookies['auth']));
  };

  if (redirectTo && redirectTo !== '/') {
    return <Redirect to={redirectTo} />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img
            className="mx-3"
            src={Logo}
            alt="Logo"
            style={{ height: '72px' }}
          />
          <h1 className="mt-4">Alaya Blog</h1>
        </div>
      </div>
      <hr />
      <div className="row">
        {!!cookies.auth ? (
          <div className="col-7">
            <PostCreateWidget addPost={handleAddPost} cookies={cookies} />
          </div>
        ) : (
          ''
        )}
        <div className="col-6">
          <PostList
            handleDeletePost={handleDeletePost}
            posts={posts}
            cookies={cookies}
          />
        </div>
      </div>
    </div>
  );
};

PostListPage.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default PostListPage;
