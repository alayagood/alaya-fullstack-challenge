import callApi from '../util/apiCaller';
import {setApplicationError} from "../components/application/AppActions";

// Export Constants
export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const SET_ERROR = 'SET_ERROR';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

// Export Actions
export function signUp(user) {
    return {
        type: SIGN_UP,
        user,
    };
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    };
}

export function setError(error) {
    return {
        type: SET_ERROR,
        error,
    };
}

export function signInSuccess(token) {
    return {
        type: SIGN_IN_SUCCESS,
        token,
    };
}

export function sigInFailure(error) {
    return {
        type: SIGN_IN_FAILURE,
        error,
    };
}

export function signUpRequest(user) {
    return async (dispatch) => {
        try {
            const response = await callApi('user/signup', 'post', {
                fullName: user.fullName,
                email: user.email,
                password: user.password,
            });

            if (response.error) {
                dispatch(setError(response.error));
            } else {
                dispatch(signUp(response.data));
            }
        } catch (error) {
            dispatch(setApplicationError(error));
        }
    };
}

export function signInRequest(user) {
    return async (dispatch) => {
        try {
            const response = await callApi('user/login', 'post', {
                email: user.email,
                password: user.password,
            });

            if (response.error) {
                dispatch(sigInFailure(response.error));
            } else {
                const token = response.data;
                dispatch(signInSuccess(token));
            }
        } catch (error) {
            dispatch(setApplicationError(error));
        }
    };
}

export function refreshTokenRequest() {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.token;

            const response = await callApi('user/token/refresh', 'post', {
                refreshToken: token.refreshToken
            });

            if (response.error) {
                dispatch(sigInFailure(response.error));
            } else {
                token.accessToken = response.data.accessToken;
                dispatch(signInSuccess(token.accessToken));
            }
        } catch (error) {
            dispatch(setApplicationError(error));
        }
    };
}

export function logoutRequest() {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.token;
            const response = await callApi('user/logout', 'post', {
                refreshToken: token.refreshToken
            }, dispatch);

            if (!response.error) {
                dispatch(logoutSuccess());
            }
        } catch (error) {
            dispatch(setApplicationError(error));
        }
    };
}