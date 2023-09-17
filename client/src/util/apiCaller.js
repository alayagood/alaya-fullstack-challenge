import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

export default async (
  endpoint,
  method = 'get',
  body,
  headers = { 'content-type': 'application/json' }
) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body,
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
