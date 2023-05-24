import fetch from 'isomorphic-fetch';

export const API_URL = 'https://api.cloudinary.com/v1_1/dfzaezp5e/image/upload';

export default async (method = 'post', body) => {
  
  return fetch(`${API_URL}`, {
    method,
    body: body,
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
