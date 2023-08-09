import { AuthActions } from '../Enums/Auth';

const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActions.SIGNUP_SUCCESS:
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case AuthActions.SIGNUP_FAILURE:
    case AuthActions.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;