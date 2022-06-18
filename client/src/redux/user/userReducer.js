import {
  LOGIN_FAILED,
  LOGIN_STARTED,
  LOGIN_SUCCEEDED,
  LOGOUT_FAILED,
  LOGOUT_STARTED,
  LOGOUT_SUCCEEDED,
  SIGNUP_FAILED,
  SIGNUP_STARTED,
  SIGNUP_SUCCEEDED,
} from "./userActions";

const initialState = {
  data: {
    name: null,
    username: null,
    token: null,
  },
  error: null,
  loading: false,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          id: action.payload.id,
          name: action.payload.name,
          token: action.payload.token,
          username: action.payload.username,
        },
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SIGNUP_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          id: action.payload.id,
          name: action.payload.name,
          token: action.payload.token,
          username: action.payload.username,
        },
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case LOGOUT_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGOUT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT_SUCCEEDED:
      return {
        ...state,
        data: {
          id: null,
          name: null,
          token: null,
          username: null,
        },
      };

    default:
      return state;
  }
};
