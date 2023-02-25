import fetch from 'isomorphic-fetch';

export const API_URL = process.env.REACT_APP_BACKEND_API_URL;

const call = async (endpoint, method = 'get', body) => {
  console.log(API_URL);
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
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
};

export default call;
