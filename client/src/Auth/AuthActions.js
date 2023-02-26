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
        }).then(res => {
            if (user.id !== undefined) {
                dispatch(login(res));
            }
            else {
                alert("Unable to register!");
            }
        })
    };
}

export function loginRequest(user) {
    return (dispatch) => {
        return callApi('auth/login', 'post', {
            email: user.email,
            password: user.password
        }).then(res => {
            if (user.id !== undefined) {
                dispatch(login(res));
            }
            else {
                alert("Unable to log in!");
            }
        })
    };
}
