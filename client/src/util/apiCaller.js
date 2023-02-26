import fetch from 'isomorphic-fetch';

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

const call = async (endpoint, method = 'get', body, token = null) => {
  let headers = {
    'content-type': 'application/json'
  }
  if (token) {
    headers = {
      ...headers,
      'Authorization': `Bearer ${token}`
    }
  }

  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  });

  let responseData = null;
  try {
    responseData = await response.json();
  } catch (_) {
    try {
      responseData = await response.text();
    } catch (_) { }
  }

  if (!response.ok) {
    throw new Error(responseData);
  }

  return responseData;
}

export default call;
