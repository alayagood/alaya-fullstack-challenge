import fetch from 'isomorphic-fetch'
import { v4 as uuidv4 } from 'uuid'

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body) => {
  const headers = {};
  let requestBody;

  if (body instanceof FormData) {
    headers['Content-Type'] = `multipart/form-data; boundary=${uuidv4()}`;
    requestBody = body;
  } else {
    headers['Content-Type'] = 'application/json';
    requestBody = JSON.stringify(body);
  }

  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: requestBody,
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
