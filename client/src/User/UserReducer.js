import {
    SIGN_UP_REQUEST,
    SIGN_UP_COMPLETE,
    SIGN_UP_FAILED,
    LOGIN_REQUEST,
    LOGIN_COMPLETE,
    LOGIN_FAILED,
    LOGOUT
 } from './UserConstants';

import Cookies from 'universal-cookie'

// Initial State
const initialState = {};

const setUserCookie = (token) => {
  const cookies = new Cookies();
  if (token === null) {
    cookies.remove('jwt_authorization');
    return;
  }
  cookies.set('jwt_authorization', token, { maxAge: 259200 })
}

const getUserCookie = () => {
  const cookies = new Cookies();
  return cookies.get('jwt_authorization');
}

const userLogin = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
        return { loading: true };
    case SIGN_UP_COMPLETE:
        setUserCookie(action.payload.token);
        return { loading: false, userToken: action.payload.token };
    case SIGN_UP_FAILED:
        return { loading: false, error: action.payload };
    case LOGIN_REQUEST:
        return { loading: true };
    case LOGIN_COMPLETE:
        setUserCookie(action.payload.token);
        return { loading: false, userToken: action.payload.token };
    case LOGIN_FAILED:
        return { loading: false, error: action.payload };
    case LOGOUT:
        setUserCookie(null);
        return {};
    default:
      const token = getUserCookie();
      return token ? { userToken: token} : state;
  }
};

export const getUserToken = (state) => state.userLogin.userToken;

// Export Reducer
export default userLogin;
