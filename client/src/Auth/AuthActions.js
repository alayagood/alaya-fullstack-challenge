import callApi from '../util/api';

export const GET_AUTHENTICATED_USER = 'GET_AUTHENTICATED_USER';
export const FINISH_SIGN_IN = 'FINISH_SIGN_IN';
export const FINISH_SIGN_UP = 'FINISH_SIGN_UP';


export function setToken(token) {
  return {
    type: GET_AUTHENTICATED_USER,
    token,
  };
}

export function getAuthenticatedUser(token) {
  return (dispatch) => !token ? Promise.resolve() : callApi({
      endpoint: 'auth/me',
      method: 'post',
      body: {
        token
      }
    }).then(res => {
        dispatch(setToken(res.token));
      })
}

export function finishSignIn({ user, token }) {
  return {
    type: FINISH_SIGN_IN,
    user,
    token
  };
}

export function signIn(credentials) {
  return (dispatch) => callApi({
    endpoint: 'auth/signin',
    method: 'post',
    body: credentials
  }).then(res => {
      dispatch(finishSignIn(res));
    });
}

export function finishSignUp(user) {
  return {
    type: FINISH_SIGN_UP,
    user,
  };
}

export function signUp(user) {
  return (dispatch) => callApi({
    endpoint: 'auth/signup',
    method: 'post',
    body: user
  }).then(res => {
      dispatch(finishSignUp(res.user));
    });
}