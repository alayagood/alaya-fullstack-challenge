import callApi from "../util/apiCaller";

export const SET_USER = "SET_USER";
export const SET_ERROR = "SET_ERROR";
const TOKEN_KEY = "token";

export function getToken() {
  return window.localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  return window.localStorage.setItem(TOKEN_KEY, token);
}

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}

export function authenticateUser(user) {
  return async (dispatch) => {
    try {
      const res = await callApi("users/authenticate", "post", {
        username: user.username,
        password: user.password,
      });
      const { id, username, token } = res;
      setToken(token);
      dispatch(setUser({ id, username }));
    } catch (err) {
      console.error(err);
      dispatch(setError("TODO: get error from response"));
    }
  };
}

export function createNewUser(user) {
  return async (dispatch) => {
    try {
      const res = await callApi("users/create", "post", {
        username: user.username,
        password: user.password,
      });
      const { id, username, token } = res;
      setToken(token);
      dispatch(setUser({ id, username }));
    } catch (err) {
      console.error(err);
      dispatch(setError("TODO: get error from response"));
    }
  };
}
