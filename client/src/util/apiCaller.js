import fetch from 'isomorphic-fetch';
import auth from './authService';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body) => {

  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json', 'Authorization': auth.getJwt()},
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  .then(
    response => response,
    error => error
  );
}
