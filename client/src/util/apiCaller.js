import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body, jwt) => {
  const headers = jwt ?
    { 'content-type': 'application/json' } :
    { 'content-type': 'application/json', 'authorization': `bearer ${jwt}` }
  return fetch(`${API_URL}/${endpoint}`, {
    headers,
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
      // not really sure about this line
      error => { throw error }
    );
}
