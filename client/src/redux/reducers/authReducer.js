import { LOGIN_REQUEST, SET_USER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, SET_TOKEN, LOGOUT_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/authActions';

const initialState = {
    loading: false,
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token'),
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            console.log('LOGIN/REGISTER REQUEST:', state, action);
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            console.log('LOGIN/REGISTER SUCCESS:', state, action);
            return {
                ...state,
                loading: false,
                error: null,
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            console.log('LOGIN/REGISTER FAILURE:', state, action);
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload,
            };
        case LOGOUT_REQUEST:
            console.log('LOGOUT:', state, action);
            return {
                ...state,
                loading: true,
            };
        case LOGOUT_SUCCESS:
            console.log('LOGOUT SUCCESS:', state, action);
            return {
                ...state,
                loading: false,
                user: null,
                token: null,
                error: null,
            };
        case LOGOUT_FAILURE:
            console.log('LOGOUT FAILURE:', state, action);
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
