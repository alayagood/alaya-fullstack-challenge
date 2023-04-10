import jwtDecode from "jwt-decode";

const tokenKey = "token";


export function setToken(token) {
  localStorage.setItem(tokenKey, token);
}


export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  setToken,
  logout,
  getCurrentUser,
  getJwt
};
