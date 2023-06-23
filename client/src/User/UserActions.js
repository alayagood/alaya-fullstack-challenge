import callApi from '../util/apiCaller';

export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const ADD_AUTH_ERRORS_USER = 'ADD_AUTH_ERRORS_USER';
export const REMOVE_AUTH_ERRORS_USER = 'REMOVE_AUTH_ERRORS_USER';

function addUser(id) {
  return {
    type: SIGNUP_USER,
    data: id,
  };
}

function addAuthErrors(errors) {
  return {
    type: ADD_AUTH_ERRORS_USER,
    data: errors,
  };
}

export function logout() {
  return {
    type: LOGOUT_USER,
  };
}

export function addUserRequest(user) {
  return (dispatch) => callApi('user', 'signup', 'post', {
    email: user.email,
    password: user.password,
  }).then((res) => {
    if (res.errors) {
      const errors = Object.values(res.errors).filter((val) => val !== '');
      dispatch(addAuthErrors(errors));
    } else {
      dispatch(addUser(res.user));
    }
  });
}

export function loginUserRequest(user) {
  return (dispatch) => callApi('user', 'login', 'post', {
    email: user.email,
    password: user.password,
  }).then((res) => {
    if (res.errors) {
      dispatch(addAuthErrors(res.errors));
    } else {
      dispatch(addUser(res.user));
    }
  });
}
