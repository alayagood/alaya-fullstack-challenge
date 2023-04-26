import { LOG_OUT, SIGN_IN, SIGN_IN_FAILURE, SIGN_UP, SIGN_UP_FAILURE } from './AuthActions';

// Initial State
const initialState = { session: null, error: null, user: null };

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        session: { ...action.session, ...state.session },
        error: null
      };
    case SIGN_UP:
      return {
        user: { ...action.user, ...state.user },
        session: null,
        error: null
      };
    case SIGN_IN_FAILURE:
    case SIGN_UP_FAILURE:
      return {
        session: null,
        error: action.error,
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

/* Selectors */
// Get token
export const getToken = state => state.session.token;

// Export Reducer
export default AuthReducer;
