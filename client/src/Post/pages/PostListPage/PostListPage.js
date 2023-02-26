import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
// Import Actions
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';

const PostListPage = () => {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data) || [];
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDeletePost = post => {
    if (!user) {
      return;
    }
    if (post.userId !== user.id) {
      return;
    }
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      dispatch(deletePostRequest(post.cuid, user.token));
    }
  };

  const handleAddPost = (post) => {
    if (!user) {
      return;
    }
    dispatch(addPostRequest(post, user.token));
  };

  return (
    <div className="row">
      {
        user &&
        <div className="col-6">
          <PostCreateWidget addPost={handleAddPost} />
        </div>
      }
      <div className="col-6">
        <PostList handleDeletePost={handleDeletePost} posts={posts} />
      </div>
    </div>
  );
};


export default PostListPage;
