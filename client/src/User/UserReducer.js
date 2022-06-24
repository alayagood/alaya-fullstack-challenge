import { SET_USER_DATA } from './UserActions';

// Initial State
const initialState = { data: {} };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA :
      return {
        data: action.user
      };

    default:
      return state;
  }
};

// Export Reducer
export default UserReducer;