import callApi from '../util/apiCaller';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_COMPLETE,
  SIGN_UP_FAILED,
  LOGIN_REQUEST,
  LOGIN_COMPLETE,
  LOGIN_FAILED,
  LOGOUT
} from './UserConstants';

export const logIn = ({ email, password }) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const res = await callApi('user/login', null, 'post', {
      user: {
        email,
        password
      },
    });

    if (res.error) {
      dispatch({ type: LOGIN_FAILED, payload: res.error });
      return;
    }
    dispatch({ type: LOGIN_COMPLETE, payload: res.user });
  };

export const signUp = (payload) => async (dispatch) => {
    dispatch({ type: SIGN_UP_REQUEST });
    const res = await callApi('user/signup', null, 'post', {
      user: {
        name: payload.username,
        email: payload.email,
        password: payload.password
      },
    });

    if (res.error) {
      dispatch({ type: SIGN_UP_FAILED, payload: res.error });
      return;
    }
    dispatch({ type: SIGN_UP_COMPLETE, payload: res.user });
  };

export const logOut = () => (dispatch) => {
  dispatch({ type: LOGOUT });
}