import {fetchData, fetchMultipartData} from '../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return fetchData('posts', 'post', {
      post: {
        email:  post.email,
        title: post.title,
        content: post.content,
        image: post.image?.trim(),
      },
    }).then(res => dispatch(addPost(res.post)));
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
    return fetchData('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return fetchData(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
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
    return fetchData(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}

export function uploadImage(file) {
  return {
    type: UPLOAD_IMAGE,
    ...file,
  };
}

export function uploadImageRequest(file) {
  return (dispatch) => {
    return fetchMultipartData('posts/cloudinary/upload', 'post', {
      file
    }).then(res => dispatch(uploadImage(res)));
  };
}
