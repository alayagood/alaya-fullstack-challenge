import callApi from '../util/apiCaller';
import { setAuthToken } from "./authService";

export const LOGOUT = 'LOGOUT';
export const LOGIN_OK = 'LOGIN_OK';
export const LOGIN_ERR = 'LOGIN_ERR';
export const SIGNUP_OK = 'SIGNUP_OK';
export const SIGNUP_ERR = 'SIGNUP_ERR';

export const logout = () => {
    return {
        type: LOGOUT,
    };
};
export const loginOk = (userData) => {
    return {
        type: LOGIN_OK,
        payload: userData,
    };
};

export const loginError = (error) => {
    return {
        type: LOGIN_ERR,
        payload: error,
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
                setAuthToken(response.token);
                dispatch(loginOk(response.user));
            } else if (response.status === 401) {
                dispatch(loginError({ message: 'Invalid username or password' }));
            } else {
                dispatch(loginError({ message: 'There has been an error, please try again later' }));
            }
        } catch (error) {
            dispatch(loginError({ message: 'There has been an error, please try again later' }));
        }
    };
};

export const signupSuccess = (userData) => {
    return {
        type: SIGNUP_OK,
        payload: userData,
    };
};

export const signupError = (error) => {
    return {
        type: SIGNUP_ERR,
        payload: error,
    };
};

export const signUpRequest = (userData) => {
    return async (dispatch) => {
        try {
            const response = await callApi('users/signup', 'POST', {
                email: userData.email,
                password: userData.password,
                userName: userData.userName
            });
            if (response.user) {
                dispatch(signupSuccess(response));
            } else if (response.status === 409) {
                dispatch(signupError({ message: 'This user already exists, please login instead' }));
            } else {
                dispatch(signupError({ message: 'There has been an error, please try again later' }));
            }
        } catch (error) {
            dispatch(signupError({ message: 'There has been an error, please try again later' }));
        }
    };
};
