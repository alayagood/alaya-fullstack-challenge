import callApi from '../../util/apiCaller'

// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// Action creators
export function loginRequest() {
    return {
        type: LOGIN_REQUEST,
    };
}

export function loginSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_SUCCESS,
        payload: token,
        result: true,
    };
}

export function loginFailure(errors) {
    return {
        type: LOGIN_FAILURE,
        payload: errors,
        result: false
    };
}

export function logoutRequest() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function logoutSuccess() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_SUCCESS,
    };
}

export function logoutFailure(errors) {
    return {
        type: LOGOUT_FAILURE,
        payload: errors,
    };
}

export function registerRequest() {
    return {
        type: REGISTER_REQUEST,
    };
}

export function registerSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: REGISTER_SUCCESS,
        payload: token,
        result: true,
    };
}

export function registerFailure(errors) {
    return {
        type: REGISTER_FAILURE,
        payload: errors,
        result: false,
    };
}

// Thunk action for login
export function login(credentials) {
    return async (dispatch) => {
        dispatch(loginRequest());

        try {
            const response  = await callApi('auth/login', 'post', credentials);

            if (response.data && response.data.token) {
                dispatch(loginSuccess(response.data.token));
                return { result: true, payload: response.data.token};
            } else {
                const errors = response.return.errors[0].msg ? response.return.errors[0].msg : 'Failed to login';
                dispatch(loginFailure(errors));
                return { result: false, payload: errors };
            }
        } catch (error) {
            dispatch(loginFailure('Failed to authenticate'));
            return { result: false, error: error };
        }
    };
}

// Thunk action for logout
export function logout() {
    return async (dispatch) => {
        dispatch(logoutRequest());

        try {
            const { data, errors } = await callApi('auth/logout', 'post');

            if (data) {
                dispatch(logoutSuccess());
            } else {
                dispatch(logoutFailure(errors));
            }
        } catch (error) {
            dispatch(logoutFailure(['Failed to logout']));
        }
    };
}

// Thunk action for register
export function register(user) {
    return async (dispatch) => {
        dispatch(registerRequest());

        try {
            const response = await callApi('auth/register', 'post', user);
            console.log('RESPONSE:', response);
            if (typeof (response.token) !== 'undefined') {
                dispatch(registerSuccess(response.token));
                return { result: true, payload: response.token};
            } else {
                const errors = response.return.errors[0].msg ? response.return.errors[0].msg : 'Failed to register';
                dispatch(registerFailure('errors'));
                return { result: false, payload: errors };
            }
        } catch (error) {
            dispatch(registerFailure(['Failed to register']));
            return { result: false, payload: error };
        }
    };
}
