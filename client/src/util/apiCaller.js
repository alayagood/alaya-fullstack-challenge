export const API_URL = 'http://localhost:3000/api';

const callApi = async (endpoint, method = 'get', body) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const requestOptions = {
        headers,
        method,
    };

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, requestOptions);
        const json = await response.json();

        if (!response.ok) {
            return { data: null, return: json };
        }

        return { data: json, errors: null };
    } catch (error) {
        return { data: null, errors: ['Failed to make the API call'] };
    }
};

export default callApi;
