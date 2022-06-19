import callApi from "../../util/apiCaller";
import removeUnusedImages from "../../util/removeUnusedImages";
import { showErrorSnackbar, showSuccessSnackbar } from "../ui/uiActions";

export const UPDATE_POST_FORM = "POST/UPDATE_POST_FORM";
export const CLEAR_POST_FORM = "POST/CLEAR_POST_FORM";

// Export Constants
export const ADD_POST_STARTED = "POST/ADD_POST_STARTED";
export const ADD_POST_SUCCEEDED = "POST/ADD_POST_SUCCEEDED";
export const ADD_POST_FAILED = "POST/ADD_POST_FAILED";

export const GET_POSTS_STARTED = "POST/GET_POSTS_STARTED";
export const GET_POSTS_SUCCEEDED = "POST/GET_POSTS_SUCCEEDED";
export const GET_POSTS_FAILED = "POST/GET_POSTS_FAILED";

export const DELETE_POST_STARTED = "POST/DELETE_POST_STARTED";
export const DELETE_POST_SUCCEEDED = "POST/DELETE_POST_SUCCEEDED";
export const DELETE_POST_FAILED = "POST/DELETE_POST_FAILED";

export function updatePostForm(payload) {
  return {
    type: UPDATE_POST_FORM,
    payload,
  };
}

export function clearPostForm() {
  return {
    type: CLEAR_POST_FORM,
  };
}

// Export Actions
export function addPost(payload) {
  return {
    type: ADD_POST_SUCCEEDED,
    payload,
  };
}

export function addPostRequest(post) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_POST_STARTED });
      const state = getState();

      const { content, images } = removeUnusedImages(
        post.content,
        post.imagesToAdd
      );

      // const fd = new FormData();
      // images.forEach((image) => {
      //   console.log({ image });
      //   fd.append("image", image);
      // });

      // const imagesResult = await callApi({
      //   endpoint: "images/upload",
      //   method: "post",
      //   data: fd,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      const response = await callApi({
        endpoint: "posts",
        method: "post",
        token: state.user.data.token,
        data: {
          content,
          title: post.title,
          owner: state.user.data.id,
        },
      });
      dispatch(addPost(response.post));
      dispatch(showSuccessSnackbar("Post added successfully"));
      dispatch(clearPostForm());
    } catch (error) {
      dispatch({ type: ADD_POST_FAILED, payload: error });
      dispatch(showErrorSnackbar("Post cannot be created"));
    }
  };
}

export function addPosts(payload) {
  return {
    type: GET_POSTS_SUCCEEDED,
    payload,
  };
}

export function fetchPosts() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_POSTS_STARTED });
      const { posts } = await callApi({ endpoint: "posts" });
      dispatch(addPosts(posts));
    } catch (error) {
      dispatch({ type: GET_POSTS_FAILED, payload: error });
      dispatch(showErrorSnackbar("Cannot get posts, maybe you're offline?"));
    }
  };
}

export function fetchPost(cuid) {
  return async (dispatch) => {
    try {
      const { post } = await callApi({ endpoint: `posts/${cuid}` });
      dispatch(addPost(post));
    } catch (error) {
      console.log({ error });
    }
  };
}

function deletePost(cuid) {
  return {
    type: DELETE_POST_SUCCEEDED,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      dispatch({ type: DELETE_POST_STARTED });
      await callApi({
        method: "delete",
        endpoint: `posts/${cuid}`,
        token: state.user.data.token,
      });
      dispatch(deletePost(cuid));
      dispatch(fetchPosts());
      dispatch(showSuccessSnackbar("Post deleted successfully"));
    } catch (error) {
      dispatch({ type: DELETE_POST_FAILED, payload: error });
      dispatch(
        showErrorSnackbar("Cannot delete post, maybe you're not the owner?")
      );
    }
  };
}
