import { ADD_JWT, ERROR, ADD_USERNAME } from './LoginActions';

// Initial State
const initialState = {};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_JWT:
      return {
        ...state,
        jwt: action.jwt,
      };
    case ERROR:
      return {
        ...state,
        error: true
      }
    case ADD_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
};

// Export Reducer
export default PostReducer;
