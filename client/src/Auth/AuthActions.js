import callApi, { updateSession } from '../util/api';

export const GET_AUTHENTICATED_USER = 'GET_AUTHENTICATED_USER';
export const FINISH_SIGN_IN = 'FINISH_SIGN_IN';
export const FINISH_SIGN_UP = 'FINISH_SIGN_UP';

export function getAuthenticatedUser() {
	return () =>
		callApi({
			endpoint: 'profile',
			method: 'post',
		}).then((res) => {
			updateSession(res.token);
		});
}

export function finishSignIn({ user, token }) {
	return {
		type: FINISH_SIGN_IN,
		user,
		token,
	};
}

export function signIn(credentials) {
	return (dispatch) =>
		callApi({
			endpoint: 'auth/signin',
			method: 'post',
			body: credentials,
		}).then((res) => {
			updateSession(res.token);
			dispatch(finishSignIn(res));
		});
}

export function finishSignUp(user) {
	return {
		type: FINISH_SIGN_UP,
		user,
	};
}

export function signUp(user) {
	return (dispatch) =>
		callApi({
			endpoint: 'auth/signup',
			method: 'post',
			body: user,
		}).then((res) => {
			updateSession(res.token);
			dispatch(finishSignUp(res.user));
		});
}
