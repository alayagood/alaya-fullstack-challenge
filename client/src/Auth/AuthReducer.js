import Cookies from 'universal-cookie';
import {
  SIGNIN_FAILED,
  SIGNIN_SUCCESSFUL,
  SIGNUP_SUCCESSFUL,
} from './AuthActions';
import { decode } from 'jsonwebtoken';

const cookies = new Cookies(null, { path: '/' });

// Initial State
const initialState = { token: null };

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESSFUL:
      cookies.set('auth', { token: action.token, ...decode(action.token) });
      return { token: action.token, ...state };
    case SIGNUP_SUCCESSFUL:
      cookies.set('auth', { token: action.token, ...decode(action.token) });
      return { token: action.token, ...state };
    case SIGNIN_FAILED:
      return { error: 'wrong email/password', ...state };
    default:
      return state;
  }
};

export default AuthReducer;
