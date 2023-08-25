import callApi from '../util/apiCaller';
import {getAuthToken} from "../Auth/authService";
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const FETCH_POST_ERR = 'FETCH_POST_ERR';
export const ADD_POST_ERR = 'ADD_POST_ERR';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post, userName) {
  return (dispatch) => {
    const formData = new FormData()
    formData.append('name', userName);
    formData.append('title', post.content);
    formData.append('content', post.content);
    formData.append('image', post.image);

    return callApi('posts', 'post', formData,{
      body: formData,
      headers: {'authorization': getAuthToken()},
    }).then(res => {
        dispatch(addPost(res.post))
    }).catch(()=> {
      dispatch(addPostError({ message: 'Could not create the post, please try again later' }));
    });
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
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    }).catch(() => {
      dispatch(fetchPostsError({ message: 'There has been an error, please try again later' }));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function addPostError(error) {
  return {
    type: ADD_POST_ERR,
    payload: error,
  };
}

export function fetchPostsError(error) {
  return {
    type: FETCH_POST_ERR,
    payload: error,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}
