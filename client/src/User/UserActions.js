import callApi from "../util/apiCaller";

export const SET_USER = "SET_USER";
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
    payload: { user },
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
      // dispatch error action here
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
      // dispatch error action here
    }
  };
}
