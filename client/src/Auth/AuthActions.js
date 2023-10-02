import { redirect } from '../Nav/NavActions';
import callApi from '../util/apiCaller';
import { alert } from '../Alert/AlertAction';

export const SIGNIN_SUCCESSFUL = 'SIGNIN_SUCCESSFUL';
export const SIGNIN_FAILED = 'SIGNIN_FAILED';
export const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export function signinRequest(email, password) {
  return (dispatch) => {
    return callApi('id/signIn', 'post', { email, password }).then((res) => {
      if (res.token) {
        dispatch(signinSuccessful(res.token));
        dispatch(redirect('/'));
      } else {
        dispatch(signinFailed());
        dispatch(alert({ message: 'wrong email/password' }));
      }
    });
  };
}

export function signupRequest(email, name, password) {
  return (dispatch) => {
    return callApi('id/signUp', 'post', { email, name, password }).then(
      (res) => {
        if (res.token) {
          dispatch(signupSuccessful(res.token));
          dispatch(redirect('/'));
        } else {
          dispatch(signupFailed());
          dispatch(
            alert({
              message: 'an account with that email address already exists',
            })
          );
        }
      }
    );
  };
}

export function signinSuccessful(token) {
  return {
    type: SIGNIN_SUCCESSFUL,
    token,
  };
}

export function signinFailed() {
  return {
    type: SIGNIN_FAILED,
  };
}

export function signupSuccessful(token) {
  return {
    type: SIGNUP_SUCCESSFUL,
    token,
  };
}

export function signupFailed() {
  return {
    type: SIGNUP_FAILED,
  };
}
