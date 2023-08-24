import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PostListItem from './PostListItem';
import {useSelector} from "react-redux";

function PostList(props) {
  const postListError = useSelector((state) => state.posts.error);
  return (
    <div className="d-flex flex-column w-100">
      <h3 className="mt-4">Posts</h3>
      {postListError && <p className="text-danger">{postListError}</p>}
      {
        props.posts && props.posts.map(post => (
            post && post.cuid ? (
          <PostListItem
            post={post}
            key={post.cuid}
            onDelete={() => props.handleDeletePost(post.cuid)}
          />
            ): null
        ))
      }
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    image: PropTypes.string
  })).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
