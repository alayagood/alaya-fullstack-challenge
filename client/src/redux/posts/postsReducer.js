import { ADD_POST, ADD_POSTS, DELETE_POST } from "./postsActions";

// Initial State
const initialState = { data: [] };

export const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        data: [action.post, ...state.data],
      };

    case ADD_POSTS:
      return {
        data: action.posts || [],
      };

    case DELETE_POST:
      return {
        data: state.data.filter((post) => post.cuid !== action.cuid),
      };

    default:
      return state;
  }
};
