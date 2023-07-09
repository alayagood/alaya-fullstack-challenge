import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body, token) => {
  const headers = { "content-type": "application/json" };
  if (token) headers["authorization"] = token;

  return fetch(`${API_URL}/${endpoint}`, {
    headers: headers,
    method,
    body: JSON.stringify(body),
  })
    .then(response =>
        response.json()
            .then(json => ({ json, response }))
            .catch(() => ({ json: {}, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        alert("Error  " + json.message);
        return Promise.reject(json);
      } else {
          return json;
      }
    });
}
