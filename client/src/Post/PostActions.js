import callApi from '../util/apiCaller';
import { ADD_POST, ADD_POSTS, DELETE_POST, ERROR } from './PostConstants';

// Export Actions
export const addPost = (post) => ({
  type: ADD_POST,
  post,
});

export const reportError = (error) => ({
  type: ERROR,
  error
})

export const addPostRequest = (post) => async (dispatch, getState) => {
  const { userLogin: { userToken }} = getState();
  const res = await callApi('posts', userToken, 'post', {
    title: post.title,
    content: post.content,
    image: post.imageData
  });
  if (!res.error) {
    dispatch(addPost(res.post));
  } else {
    dispatch(reportError({
      type: "add_post",
      msg: res.error
    }));
  }
};

export const addPosts = (posts) => ({
  type: ADD_POSTS,
  posts,
});

export const fetchPosts = () => async (dispatch, getState) => {
  const { userLogin: { userToken }} = getState();
  const res = await callApi('posts', userToken);
  if (!res.error) {
    dispatch(addPosts(res.posts));
  } else {
    dispatch(reportError({
      type: "fetch_posts",
      msg: res.error
    }));
  }
};

export const fetchPost = (cuid) => async (dispatch, getState) => {
  const { userLogin: { userToken }} = getState();
  const res = await callApi(`posts/${cuid}`, userToken);
  if (!res.error) {
    dispatch(addPost(res.post));
  } else {
    dispatch(reportError({
      type: "fetch_post",
      msg: res.error
    }));
  }
};

export const deletePost = (cuid) => ({
  type: DELETE_POST,
  cuid,
});

export const deletePostRequest = (cuid) => async (dispatch, getState) => {
  const { userLogin: { userToken }} = getState();
  const res = await callApi(`posts/${cuid}`, userToken, 'delete');
  if (!res?.error) {
    dispatch(deletePost(cuid));
  } else {
    dispatch(reportError({
      type: "del_post",
      msg: res.error
    }));
  }
};
