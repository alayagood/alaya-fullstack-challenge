import axios from 'axios';
export const LOGIN_CHECK = "LOGIN_CHECK";
export const LOGIN_RESET = "LOGIN_RESET";
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const API_URL = 'http://localhost:3000/api';

export const auth = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.post(`${API_URL}/auth`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data.result;
      if (data) {
        dispatch({ type: LOGIN_SUCCESS, payload: data.username });
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: 'Login error' });
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: 'Login error' });
    }
  }
};

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
    throw error;
  }
};

export const register = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
    throw error;
  }
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};
