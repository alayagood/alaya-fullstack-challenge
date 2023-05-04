import {  
  ADD_POST_REQUEST, 
  ADD_POST, 
  ADD_POST_FAILED,
  FETCH_POSTS_REQUEST, 
  ADD_POSTS,
  FETCH_POSTS_FAILED, 
  DELETE_POST 
} from './PostActions';

// Initial State
const initialState = { data: [], error: null, loadingAdd: false, loadingFetch: false };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        loadingAdd: true
      };

    case ADD_POST :
      return {
        loadingAdd: false,
        data: [action.post, ...state.data],
      };
    
    case ADD_POST_FAILED :
      return {
        ...state,
        loadingAdd: false,
      };

    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loadingFetch: true
      };

    case ADD_POSTS :
      return {
        data: action.posts,
        loadingFetch: false
      };
    
    case FETCH_POSTS_FAILED:
      return {
        ...state,
        loadingFetch: false
      };

    case DELETE_POST :
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
