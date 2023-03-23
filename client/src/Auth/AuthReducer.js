import { LOGIN_SUCCESS, LOGIN_FAILURE } from './AuthActions';

const initialState = {
  user: null,
  error: null,
  token: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: false };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: action.payload.token,
        error: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
