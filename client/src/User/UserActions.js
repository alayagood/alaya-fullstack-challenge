import callApi from "../util/apiCaller";
import { getUserInfo, setToken, unsetToken } from "../util/token";

export const SET_USER = "SET_USER";
export const SET_ERROR = "SET_ERROR";

export function setUser(info) {
  return {
    type: SET_USER,
    info,
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
      const { token } = res;
      setToken(token);
      dispatch(setUser(getUserInfo(token)));
    } catch (err) {
      console.error(err);
      dispatch(setError("TODO: get error from response"));
    }
  };
}

export function logoutUser() {
  unsetToken();
  return setUser(null);
}

export function createNewUser(user) {
  return async (dispatch) => {
    try {
      const res = await callApi("users/create", "post", {
        username: user.username,
        password: user.password,
      });
      const { token } = res;
      setToken(token);
      dispatch(setUser(getUserInfo(token)));
    } catch (err) {
      console.error(err);
      dispatch(setError("TODO: get error from response"));
    }
  };
}
