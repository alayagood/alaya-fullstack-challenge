import callApi from '../util/apiCaller';

// Export Constants
export const SIGH_UP = 'SIGH_UP';
export const SIGH_IN = 'SIGH_IN';
export const SIGH_OUT = 'SIGH_OUT';

// Export Actions
export function sighIn(user, authToken) {
  return {
    type: SIGH_IN,
    user,
    authToken,
  };
}
export function sighInRequest({
  email,
  password,
}) {
  return (dispatch) => {
    return callApi('login', 'post', {
      email,
      password,
    }).then(res => dispatch(sighIn(res.user, res.authToken)));
  };
}

export function register(user, authToken) {
  return {
    type: SIGH_UP,
    user,
    authToken
  };
}
export function sighUpRequest({
  name,
  email,
  password,
}) {
  return (dispatch) => {
    return callApi('register', 'post', {
      name,
      email,
      password,
    }).then(res => dispatch(register(res.user, res.authToken)));
  };
}

export function logOut() {
  return {
    type: SIGH_OUT,
  };
}