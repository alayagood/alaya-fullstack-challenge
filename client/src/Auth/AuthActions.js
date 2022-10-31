import callApi from '../util/apiCaller';

// Export Constants
export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGN_OUT = 'SIGN_OUT';

// Export Actions
export function authenticate(sessionInformation) {
    // TODO: persist sessionInformation in local storage to maintain session across reloads
    return {
        type: AUTHENTICATE,
        sessionInformation,
    };
}

export function signOut() {
    return { type: SIGN_OUT };
}

export function signIn(credentials) {
    return (dispatch) => {
        return callApi('signin', 'post', { credentials })
            .then(res => dispatch(authenticate(res)));
    };
}

export function signUp(userData) {
    return (dispatch) => {
        return callApi('signup', 'post', { userData })
            .then(sessionInformation => dispatch(authenticate(sessionInformation)));
    };
}
