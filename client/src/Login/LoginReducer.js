import { ADD_USER, LOGIN_USER} from './LoginActions';

// Initial State
const initialState = { data: [] };

const LoginReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_USER :
      return {
        data: [action.user, ...state.data],
      };

      
    case LOGIN_USER :
      return {
        data:  [action.user, ...state.data],
      };

    default:
      return state;
  }
};

// Export Reducer
export default LoginReducer;
