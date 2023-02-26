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
    return async (dispatch) => {
        try {
            const res = await callApi('auth/register', 'post', {
                name: user.name,
                email: user.email,
                password: user.password
            });
            dispatch(login(res));
        } catch (error) {
            alert("Unable to register!");
        }
    };
}

export function loginRequest(user) {
    return async (dispatch) => {
        try {
            const res = await callApi('auth/login', 'post', {
                email: user.email,
                password: user.password
            });
            dispatch(login(res));
        } catch (error) {
            alert("Unable to log in!");
        }
    };
}
