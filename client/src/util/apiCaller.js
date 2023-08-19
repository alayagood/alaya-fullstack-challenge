import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3001/api';

const apiCaller = async (endpoint, method = 'get', body) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: { 'content-type': 'application/json' },
      method,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (!response.ok) {
      throw json;
    }
    return json;
  } catch (error) {
    return error;
  }
};
export default apiCaller