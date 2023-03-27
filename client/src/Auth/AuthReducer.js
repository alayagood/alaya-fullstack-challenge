import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE } from './AuthActions';

const initialState = {
  user: null,
  error: null,
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: action.payload.token,
        error: action.payload
      };
    case REGISTER_SUCCESS:
      debugger
      return {
        ...state,
        user: null,
        token: null,
        error: false
      };
    case REGISTER_FAILURE:
      debugger
      return {
        ...state,
        user: null,
        token: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;