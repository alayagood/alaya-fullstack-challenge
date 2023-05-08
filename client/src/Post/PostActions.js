import callApi from '../util/apiCaller';

// Export Constants
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST = 'ADD_POST';
export const ADD_POST_FAILED = 'ADD_POST_FAILED';
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const ADD_POSTS = 'ADD_POSTS';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED';


// Export Actions

// Add post
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostFailed(error) {
  return {
    type: ADD_POST_FAILED,
    error,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    dispatch({ type: ADD_POST_REQUEST });
    const body = {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
        images: post.images
      },
    };
    return callApi('posts', 'post', body)
    .then(res => dispatch(addPost(res.post)))
    .catch(err => dispatch(addPostFailed(err)));
  };
}

// Fetch posts
export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    dispatch({ type: FETCH_POSTS_REQUEST });
    return callApi('posts')
    .then(res => {
      dispatch(addPosts(res.posts));
    }).catch(err => {
      dispatch({ type: FETCH_POSTS_FAILED });
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => {
      if(res.post){
        dispatch(addPost(res.post));
      }
    });
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
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}
