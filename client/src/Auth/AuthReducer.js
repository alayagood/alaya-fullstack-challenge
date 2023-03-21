import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './AuthActions';

const initialState = {
  user: null,
  error: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, error: false };
    case LOGIN_FAILURE:
      return { ...state, user: null, error: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
