import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
// Import Actions
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';
import Logo from '../../../logo.svg';

const PostListPage = ({ showAddPost }) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

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
      <div className="row">
        {showAddPost && <div className="col-4">
          <PostCreateWidget addPost={handleAddPost}  />
        </div>}
        <div className={showAddPost ? 'col-8' : 'col-12'}>
            {posts && posts.length > 0 ? <PostList handleDeletePost={handleDeletePost} posts={posts} showAddPost={showAddPost} /> : 'Loading...'}
        </div>


      </div>
    </div>
  );
};

PostListPage.propTypes = {
  showAddPost: PropTypes.bool.isRequired
};


export default PostListPage;
