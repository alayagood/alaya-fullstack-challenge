import Cookies from "js-cookie";

const TOKEN_KEY = "token";

export const getToken = () => Cookies.get(TOKEN_KEY);
export const setToken = (value) => Cookies.set(TOKEN_KEY, value);
export const unsetToken = () => Cookies.remove(TOKEN_KEY);

export const getUserInfo = (jwt) => {
  const token = jwt || getToken();
  if (!token) return undefined;
  let payload = token.split(".")[1];
  if (!payload) return undefined;
  payload = atob(payload);
  const info = JSON.parse(payload);
  return { id: info.id, username: info.username };
};
