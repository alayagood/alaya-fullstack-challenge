import callApi from '../util/apiCaller';
import Cookies from 'js-cookie';

// Export Constants
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

// Export Actions

// Register
export function registerSuccess(token) {
    return {
      type: REGISTER_SUCCESS,
      token,
    };
}

export function registerFailed(error) {
    return {
      type: REGISTER_FAILED,
      error,
    };
}
  
export function registerRequest(username, password) {
    return async (dispatch) => {
        dispatch({ type: REGISTER_REQUEST });

        const body = {
            username: username,
            password: password
        }

        return callApi('auth/register', 'post', body)
        .then(({ token }) => {
            dispatch(registerSuccess(token));
            Cookies.set('jwt', token, { expires: 7 });
        }).catch(err => {
            dispatch(registerFailed(err.error))
        });
    };
}


// Login
export function loginSuccess(token) {
    return {
      type: LOGIN_SUCCESS,
      token,
    };
}

export function loginFailed(error) {
    return {
      type: LOGIN_FAILED,
      error,
    };
}
  
export function loginRequest(username, password) {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        
        const body = {
            username: username,
            password: password
        }

        return callApi('auth/login', 'post', body)
        .then(({ token }) => {
            dispatch(loginSuccess(token));
            Cookies.set('jwt', token, { expires: 7 });
        }).catch(err => {
            dispatch(loginFailed(err.error))
        });
    };
}

// Logout
export function logout() {
    return (dispatch) => {
        dispatch({ type: LOGOUT });
        Cookies.remove('jwt');
    };
}