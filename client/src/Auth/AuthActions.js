import callApi from '../util/apiCaller';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await callApi('login', 'post', {
        email,
        password,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error,
      });
    }
  };
};