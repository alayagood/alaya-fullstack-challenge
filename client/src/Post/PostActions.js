import apiCaller from '../util/apiCaller';


// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const SET_LOADING = 'SET_LOADING';

// Export Actions

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    dispatch({ type: SET_LOADING, loading: true })
    return apiCaller.callApi('posts', 'post',
      post
      , {})
      .then(res => dispatch(addPost(res.post)))
      .catch(error => {
        dispatch({ type: SET_LOADING, loading: false })
      })
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
    return apiCaller.callApi('posts').then(res => {
      dispatch(addPosts(res.posts))
    })
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return apiCaller.callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
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
    return apiCaller.callApi(`posts/${cuid}`, "delete").then((res) => {
      if (res.ok) {
        dispatch(deletePost(cuid));
      }
    });
  };
}
