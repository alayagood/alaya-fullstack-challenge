import { DELETE_USER, SET_USER } from "./UserActions";

const initialState = { data: {} };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        data: action.user,
      };
    case DELETE_USER:
      return initialState;
    default:
      return state;
  }
};

export default UserReducer;
