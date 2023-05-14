import {SET_USER} from "./AccessActions";

export const userState = {
  idle: "idle",
  loggedOut: "loggedOut",
  loggedIn: "loggedIn",
};
// Initial State
const initialState = {user: null};

const AccessReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.user,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getUser = (state) => state.user;

// Export Reducer
export default AccessReducer;
