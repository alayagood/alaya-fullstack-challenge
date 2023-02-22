import callApi from '../util/apiCaller';

// Export Constants
export const AuthActionTypes = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
}

// Export Actions
export const login = (user) => {
    return {
        type: AuthActionTypes.LOGIN,
        user,
    };
}
export const logout = () => {
    return {
        type: AuthActionTypes.LOGOUT,
    };
}


const tokenKey = 'token'
const setToken = (token) => localStorage.setItem(tokenKey, token);
const unsetToken = () => localStorage.removeItem(tokenKey)


export const loginRequest = (user) => {
    return (dispatch) => {
        return callApi('login', 'post', user)
            .then(res => {
                setToken(res.token);
                return dispatch(login(res))
            }).catch(err => console.log(err));
    };
}

export const signupRequest = (user) => {
    return (dispatch) => {
        return callApi('signup', 'post', user)
            .then(res => {
                setToken(res.token);
                return dispatch(login(res))
            }).catch(err => console.log(err));
    };
}

export const logoutRequest = () => {
    return (dispatch) => {
        unsetToken();
        return dispatch(logout())
    }
}
