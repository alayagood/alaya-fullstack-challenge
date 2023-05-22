import Cookies from "js-cookie";

const TOKEN_KEY = "token";

export const getToken = () => Cookies.get(TOKEN_KEY);
export const setToken = (value) => Cookies.set(TOKEN_KEY, value);
export const unsetToken = () => Cookies.remove(TOKEN_KEY);

export const getTokenPayload = (token) => {
  if (!token) return undefined;
  let payload = token.split(".")[1];
  if (!payload) return undefined;
  payload = atob(payload);
  return JSON.parse(payload);
};

export const getUserInfo = (jwt) => {
  const token = jwt || getToken();
  if (!token) return null;
  if (isTokenExpired(token)) return null;
  const data = getTokenPayload(token);
  return { id: data.id, username: data.username };
};

export const isTokenExpired = (token) => {
  const data = getTokenPayload(token);
  if (!data) return true;
  const expireTime = data.exp * 1000;
  return Date.now() >= expireTime;
};
