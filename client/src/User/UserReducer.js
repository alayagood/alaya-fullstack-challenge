import { SET_USER, SET_ERROR } from "./UserActions";

const initialState = {
  account: null,
  error: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action) {
    case SET_USER:
      return { account: action.payload, error: null };
    case SET_ERROR:
      return { account: null, error: action.payload };
  }
  return state;
};

export default UserReducer;
