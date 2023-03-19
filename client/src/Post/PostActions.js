import callApi from "../util/apiCaller";

// Export Constants
export const SHOW_POST = "SHOW_POST";
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

export function showPost(post, photos) {
  return {
    type: SHOW_POST,
    post,
    photos,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi(
      "posts",
      "post",
      JSON.stringify({
        post: {
          name: post.name,
          title: post.title,
          content: post.content,
        },
      })
    ).then((res) => dispatch(addPost(res.post)));
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
    return Promise.all([
      callApi(`posts/${cuid}`),
      callApi(`posts/${cuid}/photos`),
    ]).then(([postRes, photosRes]) =>
      dispatch(showPost(postRes.post, photosRes))
    );
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
    return callApi(`posts/${cuid}`, "delete").then((res) => {
      if (res.deleted) {
        dispatch(deletePost(cuid));
      } else {
        if (window.confirm("Cannot delete another user's post")) {
          return;
        }
      }
    });
  };
}

export function uploadImage(postId, type, image) {
  const body = new FormData();
  body.append("image", image);
  body.append("type", type);

  return (dispatch) => {
    return callApi(`posts/${postId}/photos`, "post", body, {}).then((res) => {
      if (res.message) {
        if (confirm(res.message)) { // eslint-disable-line
          return;
        }
      } else {
        dispatch(fetchPost(postId));
      }
    });
  };
}
