// authReducers.js
import {LOGIN_OK, SIGNUP_OK, LOGOUT, SIGNUP_ERR, LOGIN_ERR} from './authActions';
import {saveState} from "../util/persistentStateHandler";
import {deleteAuthToken} from "./authService";

const initialState = {
    user: undefined,
    isLoggedIn: false,
    error: undefined
};

const initialSavedState = JSON.parse(localStorage.getItem('reduxState')) || initialState;

const authReducer = (state = initialSavedState, action) => {
    switch (action.type) {
        case SIGNUP_OK:
            return {
                ...state,
                isLoggedIn: false,
                user: action.payload
            }
        case LOGIN_OK:
            const loggedInState = {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }
            saveState(loggedInState)
            return loggedInState
        case LOGIN_ERR:
        case SIGNUP_ERR:
            return {
                ...state,
                user: undefined,
                isLoggedIn: false,
                error: action.payload.message
            }
        case LOGOUT:
            deleteAuthToken()
            const loggedOutState = {
                ...initialState,
                isLoggedIn: false,
                user: undefined,
            };
            saveState(loggedOutState)
            return loggedOutState
        default:
           return state
    }
};

export default authReducer;
