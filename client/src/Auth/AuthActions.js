import callApi from '../util/apiCaller';

export const login = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await callApi('/api/auth/login', 'post', {
        email,
        password,
      });

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response.data.message,
      });
    }
  };
};