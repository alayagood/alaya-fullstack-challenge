import { PostActionTypes } from './PostActions';

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case PostActionTypes.ADD_POST :
      return {
        data: [action.post, ...state.data],
      };

    case PostActionTypes.ADD_POSTS :
      return {
        data: action.posts,
      };

    case PostActionTypes.DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default PostReducer;
