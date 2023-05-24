import callApi from '../util/apiCaller';

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

export function addPostRequest(post) {
  const token =  localStorage.getItem('token');
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }, {'content-type': 'application/json', 'authorization': token}).then((res) => {if(res.post){dispatch(addPost(res.post))}return res;});
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

export function deletePostRequest(cuid) {
  const token =  localStorage.getItem('token');
  var header = {};
  if(!token){
    header = { 'content-type': 'application/json'}
  } else {
    header = { 'content-type': 'application/json', 'authorization': token};
  }
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete',{}, header).then((res) => {if(!res){dispatch(deletePost(cuid))} return res;});
  };
}
