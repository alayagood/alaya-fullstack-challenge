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
      name: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
      slug: PropTypes.string,
      cuid: PropTypes.string,
    })
  ),
  handleDeletePost: PropTypes.func.isRequired,
};

PostList.defaultProps = {
  posts: [],
};

export default PostList;
