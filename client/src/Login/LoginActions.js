import callApi from '../util/apiCaller';

export const ADD_JWT = 'ADD_JWT';
export const ERROR = 'ERROR';
export const ADD_USERNAME = 'ADD_USERNAME';

export function addJWT(jwt) {
  return {
    type: ADD_JWT,
    jwt,
  };
}

export function addUsername(username) {
  return {
    type: ADD_USERNAME,
    username,
  };
}

export function loginRequest(req, history) {
  return (dispatch) => {
    return callApi('login', 'post', {
      username: req.username,
      password: req.password
    }).then(
      (res) => {
        dispatch(addJWT(res.jwt))
        dispatch(addUsername(req.username))
        history.push("/")
      }, () => {
        dispatch({ type: ERROR })
      });
  };
}