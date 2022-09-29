import { SIGNUP, GET_TOKEN, GET_USER_TOKEN, LOGIN, CREATE_USER_TOKEN, LOGOUT, REMOVE_USER_TOKEN } from '../util/auth';

const initialState = {};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP: {
      return action.user;
    }

    case LOGIN: {
      let userToken = action.user.token;
      CREATE_USER_TOKEN(userToken);
      return { ...state, token: userToken };
    }

    case GET_TOKEN: {
      return GET_USER_TOKEN();
    }

    case LOGOUT:
      REMOVE_USER_TOKEN();
      return { ...state, user: {} };

    default:
      return state;
  }
};

export default UserReducer;
