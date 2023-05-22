import fetch from "isomorphic-fetch";
import { getToken } from "./token";

export const API_URL = "http://localhost:3000/api";

export default async (endpoint, method = "get", body) => {
  const token = getToken();
  const headers = { "content-type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  return fetch(`${API_URL}/${endpoint}`, {
    headers,
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