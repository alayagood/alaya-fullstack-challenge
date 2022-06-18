import callApi from "../../util/apiCaller";

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

// Export Actions
export function addPost(payload) {
  return {
    type: ADD_POST_SUCCEEDED,
    payload,
  };
}

export function addPostRequest(post) {
  return (dispatch, getState) => {
    dispatch({ type: ADD_POST_STARTED });
    // FIXME: Should I pick the user from here, or send it like a payload? Hmmm...
    const state = getState();

    return callApi(
      "posts",
      "post",
      {
        owner: state.user.data.id,
        title: post.title,
        content: post.content,
      },
      state.user.data.token
    )
      .then((res) => {
        dispatch(addPost(res.post));
      })
      .catch((error) => {
        dispatch({ type: ADD_POST_FAILED, payload: error });
      });
  };
}

export function addPosts(payload) {
  return {
    type: GET_POSTS_SUCCEEDED,
    payload,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    dispatch({ type: GET_POSTS_STARTED });
    return callApi("posts")
      .then((res) => {
        dispatch(addPosts(res.posts));
      })
      .catch((error) => dispatch({ type: GET_POSTS_FAILED, payload: error }));
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then((res) => dispatch(addPost(res.post)));
  };
}

function deletePost(cuid) {
  return {
    type: DELETE_POST_SUCCEEDED,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    dispatch({ type: DELETE_POST_STARTED });
    return callApi(`posts/${cuid}`, "delete")
      .then(() => dispatch(deletePost(cuid)))
      .catch((error) => {
        dispatch({ type: DELETE_POST_FAILED, payload: error });
      });
  };
}
