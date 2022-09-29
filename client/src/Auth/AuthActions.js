import callApi from '../util/apiCaller';
import { GET_TOKEN, LOGIN, LOGOUT, SIGNUP } from '../util/auth';

export const signup = (user) => {
  return {
    type: SIGNUP,
    user,
  };
};

export const signupRequest = (user) => {
  return (dispatch) => {
    return callApi('signup', 'post', {
      email: user.email,
      password: user.password,
    }).then((res) => {
      return dispatch(signup(res));
    });
  };
};

export const login = (user) => {
  return {
    type: LOGIN,
    user,
  };
};

export const loginRequest = (user) => {
  return (dispatch) => {
    return callApi('login', 'post', {
      email: user.email,
      password: user.password,
    }).then((res) => {
      return dispatch(login(res));
    });
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const getToken = () => {
  return {
    type: GET_TOKEN,
  };
};

export const getUserInfo = (token) => {
  fetch(`http://localhost:3000/auth/profile?secret_token=${token}`);
};

export const getTokenRequest = () => {
  return getToken();
};
