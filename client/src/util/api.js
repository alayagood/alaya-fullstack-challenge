import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

export default async ({ endpoint, method = 'get', body, files = [] }) => {
	let formData;

	if (files && files.length > 0) {
		formData = new FormData();
		files.forEach((f) => {
			formData.append(f.name, f);
		});
	}

	return fetch(`${API_URL}/${endpoint}`, {
		headers: formData
			? {}
			: {
					'content-type': 'application/json',
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
