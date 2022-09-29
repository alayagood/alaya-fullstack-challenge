import { REMOVE_STORAGE } from './localStorage';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const GET_TOKEN = 'GET_TOKEN';
export const LOGOUT = 'LOGOUT';

export const LOCALSTORAGE_TOKEN_ITEM = 'user_token';

export const GET_USER_TOKEN = () => {
  let token = localStorage.getItem(LOCALSTORAGE_TOKEN_ITEM);
  if (token !== undefined) {
    return token;
  }
};
export const CREATE_USER_TOKEN = (value) => localStorage.setItem(LOCALSTORAGE_TOKEN_ITEM, value);
export const REMOVE_USER_TOKEN = () => REMOVE_STORAGE(LOCALSTORAGE_TOKEN_ITEM);

export const checkToken = (token) => {
  if (typeof token === 'object') {
    if ('token' in token) {
      return true;
    }
  } else if (token !== undefined) {
    return true;
  }
};

export const parseJwt = (jwtValue) => {
  let base64url = jwtValue.split('.')[1];
  let base64 = base64url.replace(/-/g, '+').replace('/_/g', '/');
  let payload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(payload);
};

export const checkIfTokenInLocalStorage = () => {
  const tokenFromLocalStorage = localStorage.getItem(LOCALSTORAGE_TOKEN_ITEM);
  if (tokenFromLocalStorage) {
    return parseJwt(tokenFromLocalStorage);
  }
};

export const getEmailFromToken = (token) => {
  if (token) {
    const email = token.user.email;
    return email;
  }
};
