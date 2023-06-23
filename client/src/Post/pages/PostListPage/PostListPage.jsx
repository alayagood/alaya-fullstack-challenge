import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
// Import Components
import PostList from "../../components/PostList";
import PostCreateWidget from "../../components/PostCreateWidget";
// Import Actions
import {
  addPostRequest,
  deletePostRequest,
  fetchPosts,
} from "../../PostActions";
import Cookie from "js-cookie";
import Logo from "../../../logo.svg";
import { toast } from "react-hot-toast";

function PostListPage() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const posts = useSelector((state) => state.posts.data);
  const isLoggedIn = !!Cookie.get('jwt');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  const toastCb = (msg) => {
    toast(msg);
  };

  const handleDeletePost = (post) => {
    if (window.confirm("Do you want to delete this post")) {
      // eslint-disable-line
      dispatch(deletePostRequest(post, toastCb));
    }
  };

  const handleAddPost = (post) => {
    if (isLoggedIn) {
      dispatch(addPostRequest(post));
      setErrorMessage("");
    } else {
      setErrorMessage("Please login first");
    }
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
          <PostCreateWidget addPost={handleAddPost} />
          <Typography variant="h6" align="center" color="secondary">
            {errorMessage}
          </Typography>
        </div>
        <div className="col-6">
          <PostList handleDeletePost={handleDeletePost} posts={posts} />
        </div>
      </div>
    </div>
  );
}

export default PostListPage;
