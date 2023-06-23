import { SIGN_UP } from './SignupActions';

// Initial State
const initialState = {};

const SignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
};

// Export Reducer
export default SignupReducer;
