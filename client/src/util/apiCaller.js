import fetch from 'isomorphic-fetch';
import { getItem } from './dataStorage';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body) => {
  const getHeaders = () => {
    const token = getItem();

    return Object.assign({}, { 'content-type': 'application/json' },
        token ? { 'Authorization': `Bearer ${token}` } : {}
    )
  }

  return fetch(`${API_URL}/${endpoint}`, {
    headers: getHeaders(),
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
