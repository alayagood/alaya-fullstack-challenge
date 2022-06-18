import callApi from "../../util/apiCaller";

// Export Constants

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";
export const SET_TOKEN = "SET_TOKEN";

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export function loginUser(user) {
  return {
    type: LOGIN,
    user,
  };
}

export function signupUser(user) {
  return {
    type: SIGNUP,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
  };
}

export function fetchLogin(user) {
  return (dispatch) => {
    return callApi("users/login", "post", user).then((res) =>
      dispatch(setToken(res.token))
    );
  };
}

export function fetchSignup(user) {
  return (dispatch, getState) => {
    return callApi("users/signup", "post", user).then((res) =>
      dispatch(setToken(res.token))
    );
  };
}
