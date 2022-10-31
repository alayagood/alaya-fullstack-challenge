import fetch from 'isomorphic-fetch';
import store from '../store/store';

export const API_URL = 'http://localhost:3000/api';

const rejectOnHTTPError = (response) => {
    if (!response.ok) {
        return Promise.reject(response);
    }

    return response;
}

const calculateHeaders = (sessionInformation) => {
    const baseHeaders = { 'content-type': 'application/json' };

    if (typeof sessionInformation !== 'undefined') {
        baseHeaders.Authorization = `Bearer ${sessionInformation.token}`;
    }

    return baseHeaders;
}

export default async (endpoint, method = 'get', body) => {
    return fetch(`${API_URL}/${endpoint}`, {
        headers: calculateHeaders(store.getState().auth.sessionInformation),
        method,
        body: JSON.stringify(body)
    })
    .then(rejectOnHTTPError)
    .then(response => response.json().catch(err => null)); // catch in case the response is empty/malformed
}
