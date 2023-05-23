import callApi from "../util/apiCaller";
import { uploadImage } from "./utils";

// Export Constants
export const ADD_POST = "ADD_POST";
export const ADD_POSTS = "ADD_POSTS";
export const DELETE_POST = "DELETE_POST";

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post, handleUploadProgress) {
  return async (dispatch) => {
    try {
      let imageURL;
      if (post.image)
        imageURL = await uploadImage(post.image, handleUploadProgress);
      const res = await callApi("posts", "post", {
        post: {
          name: post.name,
          title: post.title,
          content: post.content,
          image: imageURL,
        },
      });
      dispatch(addPost(res.post));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi("posts").then((res) => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then((res) => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, "delete").then(() =>
      dispatch(deletePost(cuid))
    );
  };
}
