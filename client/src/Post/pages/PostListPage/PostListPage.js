import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
import { addPostRequest, deletePostRequest, fetchPosts } from  '../../../redux/actions/postActions';
import Logo from '../../../logo.svg';

const PostListPage = ({ showAddPost }) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data);
  const isAuthenticated = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

    const handleDeletePost = async (post) => {
        if (window.confirm('Do you want to delete this post?')) {
            try {
                await dispatch(deletePostRequest(post));
                alert('Post deleted successfully.');
            } catch (error) {
                alert('Failed to delete post. Please try again.');
            }
        }
    };

  const handleAddPost = post => {
    dispatch(addPostRequest(post));
  };

  return (
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex align-items-center">
            <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px' }} />
            <h1 className="mt-4">Alaya Blog</h1>
          </div>
        </div>
        <hr />
        <div className="row">
          {isAuthenticated && (
              <div className="col-6">
                <PostCreateWidget addPost={handleAddPost} showAddPost={showAddPost} />
              </div>
          )}
          <div className={isAuthenticated ? 'col-6' : 'col-12'}>
            <PostList handleDeletePost={handleDeletePost} posts={posts} />
          </div>
        </div>
      </div>
  );
};

PostListPage.propTypes = {
  showAddPost: PropTypes.bool
};

export default PostListPage;
