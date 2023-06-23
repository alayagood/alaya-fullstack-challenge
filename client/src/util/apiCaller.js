import fetch from "isomorphic-fetch";

export const API_URL = "http://localhost:3000";

export default async (api = "api", endpoint, method = "get", body) =>
  fetch(`${API_URL}/${api}/${endpoint}`, {
    headers: { "content-type": "application/json" },
    method,
    credentials: "include",
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
