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
    user: {
        token: {access_token: null, refresh_token: null},
        isAuthenticated: false,
        registrationCompleted: false
    }, error: null
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                token: action.token,
                isAuthenticated: true,
                error: null,
            };

        case SIGN_UP_SUCCESS :
            return {
                ...state,
                registrationCompleted: action.user?? false,
            };

        case REFRESH_TOKEN :
            return {
                //data: state.data.filter(post => post.cuid !== action.cuid),
            };

        case LOGOUT_SUCCESS :
            return {
                ...state,
                token: null,
                isAuthenticated: false
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            };
        case SIGN_IN_FAILURE:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                error: action.error
            };

        default:
            return state;
    }
};

export default UserReducer;
