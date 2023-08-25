import fetch from 'isomorphic-fetch';
import {getAuthToken} from '../Auth/authService';

export const API_URL = 'http://localhost:3001/api';

const apiCaller = async (endpoint, method = 'get', body, options) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: {
        'content-type': 'application/json',
        authorization: getAuthToken(),
      },
      method,
      body: JSON.stringify(body),
      ...options,
    });
    const status = response.status;
    if (status !== 200) {
      throw response;
    }
    return await response.json();
  } catch (response) {
    return response;
  }
};

export default apiCaller;
