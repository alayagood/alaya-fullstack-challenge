import { FINISH_SIGN_IN, GET_AUTHENTICATED_USER } from "./AuthActions";

const initialState = { user: null, token: null };

const AuthReducer = (previousState, action) => {
    const state = previousState || initialState;

    switch (action.type) {
        case FINISH_SIGN_IN:
            return {
                user: action.user,
                token: action.token
            }
        case GET_AUTHENTICATED_USER:
            return {
                user: previousState.user,
                token: action.token
            }
        default:
            return state;
    }
} 

export default AuthReducer;