import PropTypes from 'prop-types';
import PostListItem from './PostListItem';

const PostList = ({ posts, showAddPost, handleDeletePost }) => {
  return (
    <div className="d-flex flex-column w-100">
      <h3 className="mt-4">Posts</h3>
      <div className="row">
        {
          posts.length > 0 && posts.map(post => (
            
              <PostListItem
                cols={showAddPost ? 'col-6':'col-4'}
                post={post}
                key={post.cuid}
                onDelete={() => handleDeletePost(post.cuid)}
              />
            
          ))
        }
      </div>
    </div>
  );
}

PostList.propTypes = {
  showAddPost: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    email:  PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
