import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, token, method = 'get',
  body, headers={ 'content-type': 'application/json' }) => {
  try {
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers,
      method,
      body: JSON.stringify(body),
    });
    if (method === 'get' && endpoint ==='posts/clfq9zac4000vjzs78gkk5ajs')
      throw new Error(JSON.stringify({ error: 2}));

    if (!response.ok) {
      const errorJson = await response.json();
      throw new Error(JSON.stringify(errorJson));
    }

    if (method === 'delete') {
      // Delete was successful
      return;
    }
    const json = await response.json();
    return json;
  } catch (error) {
    return { error };
  }
}
