import {
  SIGNUP_USER,
  LOGOUT_USER,
  ADD_AUTH_ERRORS_USER,
  REMOVE_AUTH_ERRORS_USER,
} from './UserActions';

const initialState = { id: null, errors: [] };

const UserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        id: action.data,
        errors: [],
      };
    case LOGOUT_USER:
      return {
        ...initialState,
      };
    case ADD_AUTH_ERRORS_USER:
      return {
        id: null,
        errors: [...action.data],
      };
    case REMOVE_AUTH_ERRORS_USER:
      return {
        ...state,
        errros: [],
      };
    default:
      return state;
  }
};

export default UserReducer;
