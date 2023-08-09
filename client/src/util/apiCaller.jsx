import fetch from 'isomorphic-fetch';
import FormData from 'form-data';
export const API_URL = 'http://localhost:3000/api';

export const fetchData = async (endpoint, method = 'get', body) => {
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
}

export const fetchMultipartData = async (endpoint, method = 'get', body) => {
  const formData = new FormData();
  if (body) {
    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        formData.append(key, body[key]);
      }
    }
  }

  return fetch(`${API_URL}/${endpoint}`, {
    method,
    body: formData,
  })
    .then(response =>
      response.json().then(json => ({
        json,
        response,
      }))
    )
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


