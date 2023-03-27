import callApi from '../util/apiCaller';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

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

export const register = (user) => {
  return async (dispatch) => {
    try {
      const response = await callApi('signup', 'post', {
        ...user
      });

      console.log(response)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error,
      });
    }
  };
}