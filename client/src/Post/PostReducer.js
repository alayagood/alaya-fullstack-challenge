import { ADD_POST, ADD_POSTS, ADD_POST_IMAGES, DELETE_POST } from './PostActions';

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        data: [action.post, ...state.data],
      };

    case ADD_POST_IMAGES:
      const newState = state.data.map(row => {
        if (row.cuid === action.post) {
          row.images = action.images;
        }
        return { ...row };
      });

      return {
        data: [...newState]
      }

    case ADD_POSTS:
      return {
        data: action.posts,
      };

    case DELETE_POST:
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
