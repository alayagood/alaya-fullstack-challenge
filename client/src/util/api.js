import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

let CURRENT_SESSION_TOKEN;

export function updateSession(token) {
	CURRENT_SESSION_TOKEN = token;
}

export function invalidateSession() {
	CURRENT_SESSION_TOKEN = undefined;
}

export default async ({ endpoint, method = 'get', body, files = [] }) => {
	let formData;

	if (files && files.length > 0) {
		formData = new FormData();
		files.forEach((f) => {
			formData.append(f.name, f);
		});
	}

	const defaultHeaders = CURRENT_SESSION_TOKEN
		? {
				Authorization: `Bearer ${CURRENT_SESSION_TOKEN}`,
		  }
		: {};

	return fetch(`${API_URL}/${endpoint}`, {
		headers: formData
			? defaultHeaders
			: {
					'content-type': 'application/json',
					...defaultHeaders,
			  },
		method,
		body: formData || JSON.stringify(body),
	})
		.then((response) => response.json().then((json) => ({ json, response })))
		.then(({ json, response }) => {
			if (!response.ok) {
				return Promise.reject(json);
			}

			return json;
		})
		.then(
			(response) => response,
			(error) => error
		);
};
