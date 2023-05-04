import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
import PageTitle from '../../../common/components/PageTitle';
// Import Actions
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';

const PostListPage = () => {

  const dispatch = useDispatch();
  const { data, loadingAdd, loadingFetch } = useSelector(state => state.posts);
  const { token } = useSelector(state => state.auth);

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
    <div className="container mt-5">
      <PageTitle title={'AlayaBlog'}/>
      <div className="row">
        {token && <div className="col-6">
          <PostCreateWidget addPost={handleAddPost} loading={loadingAdd} />
        </div>}
        <div className="col-6">
          <PostList handleDeletePost={handleDeletePost} posts={data} loading={loadingFetch} />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
