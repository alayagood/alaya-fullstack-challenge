import { SET_USER } from "./UserActions";

const initialState = {
  user: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action) {
    case SET_USER:
      return action.payload;
  }
  return state;
};

export default UserReducer;
