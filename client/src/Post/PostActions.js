import { callApi } from '../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post, token) {
  return async (dispatch) => {
    try {
      const res = await callApi('posts', 'post', { post }, token);
      dispatch(addPost(res.post));
    } catch (error) {
      alert("Unable to create post!");
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
  return async (dispatch) => {
    try {
      const res = await callApi('posts');
      dispatch(addPosts(res.posts));
    } catch (error) {
      alert("Unable to load posts!");
    }
  };
}

export function fetchPost(cuid) {
  return async (dispatch) => {
    try {
      const res = await callApi(`posts/${cuid}`);
      dispatch(addPost(res.post));
    } catch (error) {
      alert("Unable to load post!");
    }
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid, token) {
  return async (dispatch) => {
    try {
      await callApi(`posts/${cuid}`, 'delete', undefined, token);
      dispatch(deletePost(cuid));
    } catch (error) {
      alert("Unable to delete post!");
    }
  };
}
