import React from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {getUser} from "../../Access/AccessReducer";

// Import Components
import PostListItem from "./PostListItem";

function PostList(props) {
  const {user} = useSelector((state) => getUser(state));
  return (
    <div className="d-flex flex-column w-100">
      <h3 className="mt-4">Posts</h3>
      {props.posts.map((post) => (
        <PostListItem
          post={post}
          key={post.cuid}
          onDelete={() => props.handleDeletePost(post.cuid)}
          showDeleteLink={user && user._id === post.author}
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
  userId: PropTypes.string.isRequired,
};

export default PostList;
