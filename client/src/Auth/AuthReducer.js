import { AUTHENTICATE, SIGN_OUT } from './AuthActions';

// Initial State
const initialState = { sessionInformation: {} };

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE :
            return { sessionInformation: action.sessionInformation };

        case SIGN_OUT :
            return { sessionInformation: {} };

        default:
            return state;
    }
};

/* Selectors */
export const isSignedIn = (state) => typeof state.auth.sessionInformation.token !== 'undefined';
export const getUsername = (state) => state.auth.sessionInformation.userName;

// Export Reducer
export default AuthReducer;
