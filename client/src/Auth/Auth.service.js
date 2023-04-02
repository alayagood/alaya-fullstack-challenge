import callApi from '../util/apiCaller';


export function signUpRequest(user) {
    return callApi('auth/signup', 'post', user)
}

export function loginRequest(user) {
    return callApi('auth/login', 'post', user)
}
