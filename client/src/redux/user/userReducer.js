import { LOGIN, SIGNUP, LOGOUT } from "./userActions";

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
    case LOGIN:
      return {
        ...state,
        data: {
          ...state.data,
          token: action.payload,
          username: action.payload.username,
        },
      };

    case SIGNUP:
      return {
        ...state,
        data: {
          ...state.data,
          token: action.payload.token,
          username: action.payload.username,
        },
      };

    case LOGOUT:
      return {
        data: {
          ...state.data,
          token: null,
        },
      };

    default:
      return state;
  }
};
