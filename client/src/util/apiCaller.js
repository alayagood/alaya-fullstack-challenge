export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body, options) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {'content-type': 'application/json'},
    method,
    body: JSON.stringify(body),
    credentials: 'include',
    ...options
  });

  if (response.status === 401) {
    window.location.href = '/login'
  }

  if(!response.ok){
    throw new Error(response.statusText)
  }


  if (!response.headers.get('Content-type')?.includes('application/json')) {
    const text = await response.text();

    return text;
  }

  const json = await response.json();

  return json;
}
