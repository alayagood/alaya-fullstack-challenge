import { SET_USER, SET_ERROR } from "./UserActions";

const initialState = {
  account: null,
  error: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { account: action.user, error: null };
    case SET_ERROR:
      return { account: null, error: action.error };
  }
  return state;
};

export default UserReducer;
