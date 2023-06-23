import callApi from '../util/apiCaller';

export const SIGN_UP = 'SIGN_UP';

export function signUp() {
  return {
    type: SIGN_UP
  };
}

export function signupRequest(req, history) {
  return (dispatch) => {
    return callApi('signup', 'post', {
      username: req.username,
      password: req.password
    }).then(
      (res) => {
        dispatch(signUp())
      });
  };
}