import { SET_USER } from "./UserActions";

const initialState = { data: {} };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        data: action.user,
      };
    default:
      return state;
  }
};

export default UserReducer;
