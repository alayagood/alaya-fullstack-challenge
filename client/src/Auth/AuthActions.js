import callApi from '../util/apiCaller';

// Export Constants
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const LOG_OUT = 'LOG_OUT';

// Export Actions
export function signIn(session) {
  return {
    type: SIGN_IN,
    session,
  };
}

export function signInFailure(error) {
  return {
    type: SIGN_IN_FAILURE,
    error,
  };
}

export function signUp(user) {
  return {
    type: SIGN_UP,
    user,
  };
}

export function signUpFailure(error) {
  return {
    type: SIGN_UP_FAILURE,
    error,
  };
}

export function logout() {
  return {
    type: LOG_OUT
  };
}

export function signInRequest(user) {
  return (dispatch) => {
    return callApi('auth/signin', 'post', {
      user: {
        username: user.username,
        password: user.password,
      },
    }).then(({ session }) => {
      dispatch(signIn(session))
    }).catch(err => {
      dispatch(signInFailure(err.error))
    });
  };
}

export function signUpRequest(user) {
  return (dispatch) => {
    return callApi('auth/signup', 'post', {
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
      },
    }).then(res => {
      dispatch(signUp(res))
    }).catch(err => {
      dispatch(signUpFailure(err.error))
    });
  };
}