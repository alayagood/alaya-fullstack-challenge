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
        data: {
          ...state.data,
          token: action.payload,
        },
      };

    case SIGNUP:
      return {
        data: {
          ...state.data,
          token: action.payload,
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
