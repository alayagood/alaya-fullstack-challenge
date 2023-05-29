import {
    SIGN_IN_SUCCESS,
    SIGN_UP_SUCCESS,
    REFRESH_TOKEN,
    SET_ERROR,
    SIGN_IN_FAILURE,
    LOGOUT_SUCCESS
} from './UserAction';

// Initial State
const initialState = {
    token: {access_token: null, refresh_token: null},
    isAuthenticated: false,
    registrationCompleted: false,
    errors: null
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                token: action.token,
                isAuthenticated: true,
                errors: null,
            };

        case SIGN_UP_SUCCESS :
            return {
                ...state,
                registrationCompleted: action.user ?? false,
            };

        case REFRESH_TOKEN :
            return {
                //data: state.data.filter(post => post.cuid !== action.cuid),
            };

        case LOGOUT_SUCCESS :
            return {
                ...initialState,
            };
        case SET_ERROR:
            return {
                ...state,
                ...initialState,
                errors: action.error,
            };
        case SIGN_IN_FAILURE:
            return {
                ...state,
                ...initialState,
                errors: action.error,
            };

        default:
            return state;
    }
};

export default UserReducer;
