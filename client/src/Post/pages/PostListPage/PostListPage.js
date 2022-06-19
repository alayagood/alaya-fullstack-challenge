import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../../components/PostList";
import PostCreateWidget from "../../components/PostCreateWidget";
import {
  addPostRequest,
  deletePostRequest,
  fetchPosts,
  postsDataSelector,
} from "../../../redux/posts";
import Logo from "../../../logo.svg";
import { userDataSelector } from "../../../redux/user";

const PostListPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(userDataSelector);
  const posts = useSelector(postsDataSelector);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDeletePost = (post) => {
    if (window.confirm("Do you want to delete this post?")) {
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
          <img
            className="mx-3"
            src={Logo}
            alt="Logo"
            style={{ height: "72px" }}
          />
          <h1 className="mt-4">Alaya Blog</h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-6">
          <PostCreateWidget addPost={handleAddPost} showAddPost={!!user.name} />
        </div>
        <div className="col-6">
          <PostList handleDeletePost={handleDeletePost} posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
