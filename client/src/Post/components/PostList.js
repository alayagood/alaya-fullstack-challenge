import React from "react";
import PropTypes from "prop-types";

// Import Components
import PostListItem from "./PostListItem/index";

function PostList(props) {
  return (
    <div className="d-flex flex-column w-100 my-4">
      <h3 className="h4 mb-3">Posts</h3>
      {props.posts.map((post) => (
        <PostListItem
          post={post}
          key={post.cuid}
          onDelete={() => props.handleDeletePost(post.cuid)}
        />
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
