import { AuthActionTypes }  from './AuthActions';

// Initial State
const initialState = { user: {}};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN :
            return {user : action.user};
        case AuthActionTypes.LOGOUT :
            return {user: {} };
        default:
            return state;
    }
};

/* Selectors */

export const getUserId = state => state.auth?.user?._id;

// Export Reducer
export default  AuthReducer;
