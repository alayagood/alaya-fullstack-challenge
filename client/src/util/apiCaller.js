import fetch from 'isomorphic-fetch';
import processApiResponse from "./processApiResponse";

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body, accessToken, dispatch = null) => {

    const headers = {
        'Content-Type': 'application/json',
    };

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (body) {
        body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}/${endpoint}`, {
        headers,
        method,
        body
    });

    return processApiResponse(response, dispatch);
}