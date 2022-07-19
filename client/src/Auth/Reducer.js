import { SET_AUTH, CLEAR_AUTH } from "@/Auth/Actions";

const initialState = {
    isAuthenticated: false,
    user: {}
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_AUTH :
        return {
            ...state,
            isAuthenticated: true,
            user: action.user
        };
    case CLEAR_AUTH :
        return {
            ...state,
            isAuthenticated: false,
            user: null
        };

    default:
        return state;
    }
};

/* Selectors */

// Is authenticated
export const getAuthenticated = state => state.auth.isAuthenticated;

// Get user
export const getUser = state => state.auth.user;

// Export Reducer
export default Reducer;
