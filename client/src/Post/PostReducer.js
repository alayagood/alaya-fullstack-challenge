import {ADD_POST, ADD_POST_ERR, ADD_POSTS, DELETE_POST, FETCH_POST_ERR} from './PostActions';

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        data: [action.post, ...state.data],
      };
    case ADD_POSTS:
      return {
        data: action.posts,
      };
    case DELETE_POST:
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };
    case ADD_POST_ERR:
      return {
        error: action.payload.message,
      };
    case FETCH_POST_ERR:
      return {
        error: action.payload.message,
      };
    default:
      return state;
  }
};
// Export Reducer
export default PostReducer;
