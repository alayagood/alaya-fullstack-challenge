import { getUserInfo } from "../util/token";
import { SET_USER, SET_ERROR } from "./UserActions";

const initialState = {
  info: getUserInfo(),
  error: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { info: action.info, error: null };
    case SET_ERROR:
      return { info: null, error: action.error };
    default:
      return state;
  }
};

export default UserReducer;
