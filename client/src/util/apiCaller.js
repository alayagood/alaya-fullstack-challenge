import fetch from 'isomorphic-fetch';
import { initialStore } from '..';

export const API_URL = 'http://localhost:3000/api';

const getToken = () => {
  try {
    const { session: { token } } = initialStore.getState().auth;
    return token;
  } catch (err) {
    return null;
  }
}

export default async (endpoint, method = 'get', body) => {
  const token = getToken();
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json', ...(token && { 'Authorization': `${token}` }) },
    method,
    body: JSON.stringify(body),
  })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {

      // Invalid Token validator
      if (response.status === 498) {
        window.location.href = "/";
      }

      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
}
