import fetch from 'isomorphic-fetch';
import auth from './authService';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body, file="false") => {

  return fetch(`${API_URL}/${endpoint}`, {
   headers: file ?  { 'Authorization': auth.getJwt()} : { 'content-type': 'application/json', 'Authorization': auth.getJwt()},
   method,
   body: file && body !== undefined ? body.data:  JSON.stringify(body),
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
