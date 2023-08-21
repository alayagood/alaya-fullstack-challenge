import fetch from 'isomorphic-fetch';
import {getAuthToken} from "../Auth/authService";

export const API_URL = 'http://localhost:3001/api';

const apiCaller = async (endpoint, method = 'get', body) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: {
            'content-type': 'application/json',
            'authorization': getAuthToken()
      },
      method,
      body: JSON.stringify(body),
    });

    if (response.status !== 200) {
      throw response
    }
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