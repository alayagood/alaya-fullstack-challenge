import fetch from 'isomorphic-fetch';

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

const call = async (endpoint, method = 'get', body, token = null) => {
  let headers = {
    'content-type': 'application/json'
  }
  if (token) {
    headers = {
      ...headers,
      'Authorization': `Bearer ${token}`
    }
  }

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
      error => error
    );
};

export default call;
