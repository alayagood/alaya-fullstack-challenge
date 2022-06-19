import React from "react";
import PropTypes from "prop-types";

// Import Components
import { PostListItem, PostListEmptyItem } from "./PostListItem";

function PostList({ posts, handleDeletePost }) {
  return (
    <div className="d-flex flex-column w-100">
      <h3 className="mt-4">Posts</h3>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostListItem
            post={post}
            key={post.cuid}
            onDelete={() => handleDeletePost(post.cuid)}
          />
        ))
      ) : (
        <PostListEmptyItem />
      )}
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

PostList.defaultProps = {
  posts: [],
};

export default PostList;
