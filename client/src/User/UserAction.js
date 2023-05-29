import callApi from '../util/apiCaller';
import {
  setApplicationError,
  setNotificationMessage,
} from '../components/application/AppActions';

// Export Constants
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const SET_ERROR = 'SET_ERROR';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

// Export Actions
export function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
    user,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}

export function signInSuccess(token) {
  return {
    type: SIGN_IN_SUCCESS,
    token,
  };
}

export function sigInFailure(error) {
  return {
    type: SIGN_IN_FAILURE,
    error,
  };
}

export function signUpRequest(user) {
  return async (dispatch) => {
    try {
      const response = await callApi('user/signup', 'post', {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
      });

      if (response.errors) {
        dispatch(setError(response.errors));
      } else {
        dispatch(signUpSuccess(response.data));
        dispatch(setNotificationMessage(
            'Congratulations! You are now registered. You can proceed to sign in.'));
      }
    } catch (error) {
      dispatch(setApplicationError(error));
    }
  };
}

export function signInRequest(user) {
  return async (dispatch) => {
    try {
      const response = await callApi('user/login', 'post', {
        email: user.email,
        password: user.password,
      });

      if (response.status === 422) {
        dispatch(sigInFailure(response.message));
      } else {
        const token = response.data;
        dispatch(signInSuccess(token));
      }
    } catch (error) {
      dispatch(setApplicationError(error));
    }
  };
}

export function refreshTokenRequest() {
  return async (dispatch, getState) => {
    try {
      const token = getState().user.token;

      const response = await callApi('user/token/refresh', 'post', {
        refreshToken: token.refreshToken,
      });

      if (response.errors) {
        dispatch(sigInFailure(response.error));
      } else {
        token.accessToken = response.data.accessToken;
        dispatch(signInSuccess(token.accessToken));
      }
    } catch (error) {
      dispatch(setApplicationError(error));
    }
  };
}

export function logoutRequest() {
  return async (dispatch, getState) => {
    try {
      const token = getState().user.token;
      const response = await callApi('user/logout', 'post', {
            refreshToken: token.refreshToken,
          },
          token.accessToken,
          dispatch,
      );

      if (!response.errors) {
        dispatch(logoutSuccess());
      }
    } catch (error) {
      dispatch(setApplicationError(error));
    }
  };
}