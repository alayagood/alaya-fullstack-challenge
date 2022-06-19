import axios from "axios";

export const API_URL = "http://localhost:3000/api";

/**
 * @param {{ endpoint: string, method: string, data: any, token: string, headers: any }} options
 * @param {any} data (optional)
 */
export default async ({
  endpoint,
  method = "get",
  data = {},
  token = "",
  headers = {},
}) => {
  const authHeader = token ? { Authorization: `bearer ${token}` } : {};

  const newHeaders = {
    "Content-Type": "application/json",
    ...authHeader,
    ...headers,
  };

  return axios({
    url: `${API_URL}/${endpoint}`,
    headers: newHeaders,
    method,
    data,
  })
    .then(({ data }) => data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (![200, 201].includes(error.response.status)) {
          throw error;
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        // throw new Error("No response");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        throw error;
      }
    });
};
