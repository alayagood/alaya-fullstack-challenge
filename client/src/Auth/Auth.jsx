import jwtDecode from 'jwt-decode';

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const decodeAuthToken = () => {
  const token = getAuthToken();
  if (token) {
    return jwtDecode(token);
  }
  return null;
};

export const decodeValue = (value) => { 
  if (value) {
    return jwtDecode(value);
  }
  return null;
};