import callApi from '../util/apiCaller';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(user) {
    return {
        type: LOGIN,
        user,
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}

export function registerRequest(user) {
    return (dispatch) => {
        return callApi('auth/register', 'post', {
            name: user.name,
            email: user.email,
            password: user.password
        }).then(res => dispatch(login(res)));
    };
}

export function loginRequest(user) {
    return (dispatch) => {
        return callApi('auth/login', 'post', {
            email: user.email,
            password: user.password
        }).then(res => dispatch(login(res)));
    };
}
