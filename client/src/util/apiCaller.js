import fetch from "isomorphic-fetch";

export const API_URL = "http://localhost:3000/api";

/**
 * @param {string} endpoint
 * @param {string} method Default "get"
 * @param {any} body (optional)
 */
export default async (endpoint, method = "get", body = {}, token = "") => {
  const authHeader = token ? { Authorization: `bearer ${token}` } : {};

  return fetch(`${API_URL}/${endpoint}`, {
    headers: { "content-type": "application/json", ...authHeader },
    method,
    body: JSON.stringify(body),
  })
    .then((response) => response.json().then((json) => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
    .then(
      (response) => response,
      (error) => error
    );
};
