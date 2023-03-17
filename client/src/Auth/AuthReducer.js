import { SIGN_UP, LOGIN } from './AuthActions';

// Initial State
const initialState = { data: [] };

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP :
      return {
        data: [action.user, ...state.data],
      };
    default:
      return state;
  }
};

// Export Reducer
export default AuthReducer;