import fetch from "isomorphic-fetch";

const API_URL = process.env.REACT_APP_API_URL;

export default async function request(endpoint, method = "get", body) {
  const url = `${API_URL}/${endpoint}`;
  const options = {
    method,
    headers: {"content-type": "application/json"},
    body: JSON.stringify(body),
    credentials: "include",
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = new Error(
        `error: ${response.status} ${response.statusText}`
      );
      error.response = response;
      throw error;
    }
    return response.json();
  } catch (error) {
    if (!error.response) {
      throw new Error(error.message);
    }
    try {
      const json = await error.response.json();
      error.json = json;
    } catch (e) {
      error.json = null;
    }

    throw error;
  }
}
