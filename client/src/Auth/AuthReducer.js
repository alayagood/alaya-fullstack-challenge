import { LOGIN, LOGOUT } from './AuthActions';

const initialState = { user: null };

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                user: action.user
            };
        case LOGOUT:
            return {
                user: null
            };

        default:
            return state;
    }
};

export default AuthReducer;
