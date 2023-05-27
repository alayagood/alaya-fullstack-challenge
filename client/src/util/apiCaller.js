export const API_URL = 'http://localhost:3000/api';

const callApi = async (endpoint, method = 'get', body) => {
    const headers = {};

    const token = localStorage.getItem('token');
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const requestOptions = {
        headers,
        method,
    };

    if (body) {
        if (body instanceof FormData) {
            requestOptions.body = body;
        } else {
            headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, requestOptions);

        if (response.ok) {
            const contentType = response.headers.get('Content-Type');

            if (contentType && contentType.includes('application/json')) {
                let data;

                try {
                    data = await response.json();
                    return { data, errors: null };
                } catch (error) {
                    throw new Error('Failed to parse JSON');
                }
            } else {
                const data = await response.text();
                return { data, errors: null };
            }
        } else {
            throw new Error(await response.text() || 'Failed to make the API call');
        }
    } catch (error) {
        throw new Error('Failed to make the API call');
    }
};

export default callApi;
