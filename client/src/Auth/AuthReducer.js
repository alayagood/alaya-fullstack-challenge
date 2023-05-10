import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT
} from './AuthActions';

// Initial State
const initialState = { loading: false, token: null, error: null };

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
        return { loading: true, token: null, error: null };
    case REGISTER_SUCCESS:
        return { loading: false, token: action.token };
    case REGISTER_FAILED:
        return { loading: false, error: action.error };
    case LOGIN_REQUEST:
        return { loading: true };
    case LOGIN_SUCCESS:
        return { loading: false, token: action.token };
    case LOGIN_FAILED:
        return { loading: false, error: action.error };
    case LOGOUT:
        return { loading: false, token: null, error: null };
    default:
      return state;
  }
};

/* Selectors */
export const getToken = (state) => state.auth.token;

export default AuthReducer;