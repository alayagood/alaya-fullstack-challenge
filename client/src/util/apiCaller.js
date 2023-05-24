import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body, header={'content-type': 'application/json'}) => {

  return fetch(API_URL + '/' + endpoint, {
    headers: header,
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response }), json => ({ response, response })))
  .then(({ json, response }) => {
    if(json===undefined && !response.ok){
      return response;
    }else if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
