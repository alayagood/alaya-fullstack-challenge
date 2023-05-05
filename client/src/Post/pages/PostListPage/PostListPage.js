import React, {useEffect} from "react";

import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";

// Import Components
import PostList from "../../components/PostList";
import PostCreateWidget from "../../components/PostCreateWidget";
// Import Actions
import {addPostRequest, deletePostRequest, fetchPosts} from "../../PostActions";
import Logo from "../../../logo.svg";

const PostListPage = ({showAddPost}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDeletePost = (post) => {
    // eslint-disable-next-line
    if (confirm("Do you want to delete this post")) {
      dispatch(deletePostRequest(post));
    }
  };

  const handleAddPost = async (post) => {
    return dispatch(addPostRequest(post));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img
            className="mx-3"
            src={Logo}
            alt="Logo"
            style={{height: "72px"}}
          />
          <h1 className="mt-4">Alaya Blog</h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-6">
          <PostCreateWidget addPost={handleAddPost} showAddPost={showAddPost} />
        </div>
        <div className="col-6">
          {posts && (
            <PostList handleDeletePost={handleDeletePost} posts={posts} />
          )}
        </div>
      </div>
    </div>
  );
};

PostListPage.propTypes = {
  showAddPost: PropTypes.func.isRequired,
};

export default PostListPage;
