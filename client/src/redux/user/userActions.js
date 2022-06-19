import callApi from "../../util/apiCaller";
import { push } from "connected-react-router";
import { showErrorSnackbar, showSuccessSnackbar } from "../ui/uiActions";

// Export Constants

export const LOGIN_STARTED = "USER/LOGIN_STARTED";
export const LOGIN_FAILED = "USER/LOGIN_FAILED";
export const LOGIN_SUCCEEDED = "USER/LOGIN_SUCCEEDED";

export const SIGNUP_STARTED = "USER/SIGNUP_STARTED";
export const SIGNUP_FAILED = "USER/SIGNUP_FAILED";
export const SIGNUP_SUCCEEDED = "USER/SIGNUP_SUCCEEDED";

export const LOGOUT_STARTED = "USER/LOGOUT_STARTED";
export const LOGOUT_FAILED = "USER/LOGOUT_FAILED";
export const LOGOUT_SUCCEEDED = "USER/LOGOUT_SUCCEEDED";

export const SET_TOKEN_STARTED = "USER/SET_TOKEN_STARTED";

export function saveUserInStore(payload) {
  return {
    type: LOGIN_SUCCEEDED,
    payload,
  };
}

export function saveSignedUpUser(payload) {
  return {
    type: SIGNUP_SUCCEEDED,
    payload,
  };
}

export function fetchLogin(data) {
  return async (dispatch) => {
    try {
      const res = await callApi({
        endpoint: "users/login",
        method: "post",
        data,
      });
      dispatch(saveUserInStore(res));
      dispatch(push("/"));
      dispatch(showSuccessSnackbar("Login success!"));
      dispatch({ type: LOGIN_STARTED });
    } catch (error) {
      dispatch({ type: LOGIN_FAILED, payload: error });
      dispatch(showErrorSnackbar("Login failed"));
    }
  };
}

export function fetchSignup(data) {
  return (dispatch) => {
    dispatch({ type: SIGNUP_STARTED });
    return callApi({ endpoint: "users/signup", method: "post", data })
      .then((res) => {
        dispatch(saveSignedUpUser(res.status));
        dispatch(push("/"));
        dispatch(showSuccessSnackbar("Signup success!"));
      })
      .catch((err) => {
        dispatch({ type: SIGNUP_FAILED, payload: err });
        dispatch(showErrorSnackbar("Signup failed, please try again later"));
      });
  };
}

export function logoutUser() {
  return (dispatch) => {
    try {
      dispatch({ type: LOGOUT_STARTED });
      dispatch(push("/"));
      dispatch({ type: LOGOUT_SUCCEEDED });
      dispatch(showSuccessSnackbar("Logout success, come again soon!"));
    } catch (error) {
      dispatch({ type: LOGOUT_FAILED });
    }
  };
}
