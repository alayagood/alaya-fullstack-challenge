import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body, auth) => {
  const headers = { 'content-type': 'application/json' };
  if (auth) {
    headers.Authorization = `Bearer ${auth.token}`;
  }
  const payload = {
    headers,
    method,
  };
  if (body) {
    payload.body = JSON.stringify(body);
  }
  return fetch(`${API_URL}/${endpoint}`, payload)
    .then((response) => response.json().then((json) => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
    .then(
      (response) => response,
      (error) => error
    );
};
