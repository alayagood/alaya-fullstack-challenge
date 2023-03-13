import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
// Import Actions
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';
import Title from '../../../common/components/Title';

const PostListPage = ({ showAddPost }) => {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data);
  const user = useSelector(state => state.user.data);
  const isLoggedIn = !!user?.accountName;

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
        <Title text="Alaya Blog" />
      </div>
      <hr />
      <div className="row">
        {
          isLoggedIn &&
          <div className="col-6">
            <PostCreateWidget addPost={handleAddPost} showAddPost={showAddPost} />
          </div>
        }
        <div className={isLoggedIn ? "col-6" : "col-12"}>
          <PostList handleDeletePost={handleDeletePost} posts={posts} currentUser={user?.accountName} />
        </div>
      </div>
    </div>
  );
};

PostListPage.propTypes = {
  showAddPost: PropTypes.bool.isRequired
};


export default PostListPage;
