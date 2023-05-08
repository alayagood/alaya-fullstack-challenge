import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core/'

// Import Components
import PostListItem from './PostListItem';

function PostList(props) {
  return (
    <div className="d-flex flex-column w-100">
      <h3 className="mt-4">Posts</h3>
      { props.loading ? <CircularProgress /> :
        props.posts.length > 0 ?
        props.posts.map(post => (
          <PostListItem
            post={post}
            key={post.cuid}
            onDelete={() => props.handleDeletePost(post.cuid)}
          />
        ))
        :
        <span className='mt-5'>There are no posts :(</span>
      }
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
