import callApi from '../util/apiCaller';
import jwtDecode from "jwt-decode";

// Export Constants

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const UPDATE_AUTHENTICATION = 'UPDATE_AUTHENTICATION';

export function signUpRequest(user) {
  return (dispatch) => {
    callApi("user/signup", "post", JSON.stringify({
      email: user.email,
      password: user.password,
    }))
      .then(res => {
        if (res.accessToken) {
          localStorage.setItem("accessToken", res.accessToken);
          dispatch({
            type: SIGN_UP_SUCCESS,
            payload: {
              accessToken: res.accessToken,
              id: res.user._id,
              role: res.user.role,
            }
          });
        } else {
          throw new Error(res.message);
        }
      })
      .catch(error => {
        dispatch({ type: SIGN_UP_ERROR, error, message: error.message });
      });
  };
}

export function loginRequest(user) {
  return (dispatch) => {
    callApi("user/login", "post", JSON.stringify({
      email: user.email,
      password: user.password,
    }))
      .then(res => {
        if (res.accessToken) {
          localStorage.setItem("accessToken", res.accessToken);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              accessToken: res.accessToken,
              id: res.user._id,
              role: res.user.role,
            }
          });
        } else {
          throw new Error(res.message);
        }
      })
      .catch(error => {
        dispatch({ type: LOGIN_ERROR, error, message: error.message });
      });
  };
}

export function logoutRequest() {
  return (dispatch) => {
    localStorage.removeItem("accessToken");
    return dispatch({
      type: UPDATE_AUTHENTICATION,
      payload: {
        isAuthenticated: false,
        user: null,
      }
    });
  };
}

export function checkAuthentication() {
  return (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return dispatch({
        type: UPDATE_AUTHENTICATION,
        payload: { isAuthenticated: false, id: null, accessToken: null, role: null }
      });
    }
    const decodedAccessToken = jwtDecode(accessToken);
    const currentTime = Date.now()
    if (!decodedAccessToken.exp || currentTime > Number(decodedAccessToken.exp) * 1000) {
      localStorage.removeItem('accessToken');
      return dispatch({
        type: UPDATE_AUTHENTICATION,
        payload: {
          isAuthenticated: false,
          id: null,
          role: null,
        },
      });
    }
    // If accessToken is present and not expired, set isAuthenticated to true
    dispatch({
      type: UPDATE_AUTHENTICATION,
      payload: {
        isAuthenticated: true,
        accessToken,
        id: decodedAccessToken.id,
        role: decodedAccessToken.role,
      }
    });
  };
}
