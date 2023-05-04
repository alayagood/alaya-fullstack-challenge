import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body) => {
  const token = Cookies.get('jwt');
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json', ...(token && { 'Authorization': `Bearer ${token}` }) },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      if (response.status === 401) {
        // delete JWT cookie if exists
        Cookies.remove('jwt');
        // redirect to login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      return Promise.reject(json);
    }

    return json;
  });
}
