import callApi from '../util/apiCaller';
import {setAuthToken} from "./authService";

export const LOGOUT = 'LOGOUT';
export const SIGNUP_OK = 'SIGNUP_OK';
export const SIGNUP_ERR = 'SIGNUP_ERR';
export const LOGIN_OK = 'SIGNUP_OK';
export const LOGIN_ERR = 'SIGNUP_ERR'

export const loginOk = (userData) => {
    return {
        type: LOGIN_OK,
        payload: userData,
    };
};

export const loginError = (userData) => {
    return {
        type: LOGIN_ERR,
        payload: userData,
    };
};

export const signupSuccess = (userData) => {
    return {
        type: SIGNUP_OK,
        payload: userData,
    };
};

export const signupError = (userData) => {
    return {
        type: SIGNUP_ERR,
        payload: userData,
    };
};

export const loginRequest = (userData) => {
    return async (dispatch) => {
        try {
            const response = await callApi('users/login', 'POST', {
                email: userData.email,
                password: userData.password,
            });
            if (response.user && response.token) {
                setAuthToken(response.token)
                dispatch(loginOk(response.user));
            } else if (response.error) {
                dispatch(loginError({ message: response.error }));
            } else {
                dispatch(loginError({ message: 'Invalid Credentials' }))
            }
        } catch (error) {
            //dispatch(setApplicationError(error));
        }
    };
};

export const signUpRequest = (userData) => {
    return async (dispatch) => {
        try {
            const response = await callApi('users/signup', 'POST', {
                email: userData.email,
                password: userData.password,
            });
            //if (response.user && response.token) {
            if (response.user) {
                setAuthToken(response.token);
                dispatch(signupSuccess(dispatch, response));
            } else if (response.error) {
                dispatch(signupError({ message: response.error }));
            } else {
                dispatch(signupError({ message: 'Invalid Credentials' }))
            }
        } catch (error) {
            //dispatch(setApplicationError(error));
        }
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};
