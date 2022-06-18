import {
  ADD_POST_FAILED,
  ADD_POST_STARTED,
  ADD_POST_SUCCEEDED,
  DELETE_POST_STARTED,
  GET_POSTS_STARTED,
  GET_POSTS_SUCCEEDED,
  GET_POSTS_FAILED,
} from "./postsActions";

// Initial State
const initialState = { loading: false, error: null, data: [] };

export const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_STARTED:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case ADD_POST_SUCCEEDED:
      return {
        ...state,
        error: null,
        loading: false,
        data: [action.payload, ...state.data],
      };

    case ADD_POST_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_POSTS_STARTED:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case GET_POSTS_SUCCEEDED:
      return {
        ...state,
        error: null,
        loading: false,
        data: action.payload,
      };

    case GET_POSTS_FAILED:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case DELETE_POST_STARTED:
      return {
        data: state.data.filter((post) => post.cuid !== action.payload),
      };

    default:
      return state;
  }
};
