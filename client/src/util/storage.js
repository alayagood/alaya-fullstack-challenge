import Logger from './logger';
import { updateSession } from './api';

const SESSION_STORAGE_KEY = 'session_state';

export function getSessionStorage() {
	try {
		const rawState = sessionStorage.getItem(SESSION_STORAGE_KEY);

		if (rawState) {
			const state = JSON.parse(rawState);

			updateSession(state?.auth?.token);

			return state;
		}
	} catch (error) {
		Logger.error(error);
	}

	return undefined;
}

export function saveSessionStorage(state) {
	try {
		const serialisedState = JSON.stringify(state);

		sessionStorage.setItem(SESSION_STORAGE_KEY, serialisedState);
	} catch (e) {
		Logger.warn(e);
	}
}
