import { CREATE_USER } from "./UserActions";

const initialState = { data: [] };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER :
      return {
        data: [action.user, ...state.data],
      };

    default:
      return state;
  }
};

export default UserReducer;
