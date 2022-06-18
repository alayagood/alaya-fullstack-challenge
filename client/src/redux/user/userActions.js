import callApi from "../../util/apiCaller";
import { push } from "connected-react-router";

// Export Constants

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";
export const SET_TOKEN = "SET_TOKEN";

export function loginUser(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

export function signupUser(payload) {
  return {
    type: SIGNUP,
    payload,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
  };
}

export function fetchLogin(user) {
  return (dispatch) => {
    return callApi("users/login", "post", user).then((res) => {
      dispatch(loginUser(res));
      dispatch(push("/"));
    });
  };
}

export function fetchSignup(user) {
  return (dispatch) => {
    return callApi("users/signup", "post", user).then((res) => {
      dispatch(signupUser(res));
      dispatch(push("/"));
    });
  };
}
