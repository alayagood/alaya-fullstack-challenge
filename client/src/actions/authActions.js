import axios from 'axios';
export const LOGIN_RESET = "LOGIN_RESET";
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const API_URL = 'http://localhost:3000/api';

export const auth = () => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/auth`, { token });
    let user = response.data.result;
    user.token = token;
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  }
  catch { }
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
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};
