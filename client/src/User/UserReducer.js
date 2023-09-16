import {
  UPDATE_AUTHENTICATION,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './UserActions';

const initialState = {
  isAuthenticated: false,
  id: null,
  role: null,
  accessToken: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        accessToken: action.payload.accessToken || null,
      };
    case LOGIN_SUCCESS:
      console.log("SSSS")
      return {
        ...state,
        isAuthenticated: true,
        id: action.payload.id,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
        error: null
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        id: action.payload.id,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
        error: null
      };
    case LOGIN_ERROR:
    case SIGN_UP_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        id: null,
        role: null,
        accessToken: null,
        error: action.payload
      };
    default:
      return state;
  }
}
