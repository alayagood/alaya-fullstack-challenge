import callApi from '../util/apiCaller';
import { storeItem } from '../util/dataStorage';

export const SET_USER_DATA = 'SET_USER_DATA';

export function storeUserData(user) {
    return (dispatch) => {
        storeItem(user.token);
        dispatch(setUserData(user))
    };
}

export function setUserData(user) {
    return {
        type: SET_USER_DATA,
        user,
    };
}

export function signUp({ name, password }) {
    return (dispatch) => {
        return callApi('user/signup', 'post', {
            user: {
                name,
                password
            },
        }).then(({ token }) => {
            dispatch(storeUserData({
                name,
                token
            }))
        })
        .catch(err => console.error('something went wrong'));
    };
}

export function login({ name, password }) {
    return (dispatch) => {
        return callApi('user/login', 'post', {
            user: {
                name,
                password
            },
        }).then(({ token }) => dispatch(storeUserData({
            name,
            token
        })))
        .catch(err => console.error('something went wrong'));
    };
}