import callApi from "../util/apiCaller";
import { setToken }  from "../util/token";

export const USER_LOGIN = 'USER_LOGIN';
export function loginUser(username, token) {
    setToken(token);
    return {
        type: USER_LOGIN,
        user: {username, token}
    }
}

export function loginUserRequest(user) {
    return async (dispatch) => {
        return await callApi('users/authenticate', 'post', {
            user: {
                username: user.username,
                password: user.password
            },
        }).then(res => dispatch(loginUser(user.username, res.token)));
    };
}

export function signUpUserRequest(user) {
    return async (dispatch) => {
        return await callApi('users', 'post', {
            user: {
                username: user.username,
                password: user.password
            },
        }).then(res => dispatch(loginUser(user.username, res.token)));
    };
}