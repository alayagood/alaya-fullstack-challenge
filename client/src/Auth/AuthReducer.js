import { SIGH_IN, SIGH_UP, SIGH_OUT } from './AuthActions';

// Initial State
const initialState = {
  user: sessionStorage.getItem('user'),
  authToken: sessionStorage.getItem('authToken'),
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGH_IN :
      storeUserData(action.user, action.authToken);

      return {
        user: action.user,
        authToken: action.authToken,
      };

    case SIGH_UP :
      storeUserData(action.user, action.authToken);

      return {
        user: action.user,
        authToken: action.authToken,
      };

    case SIGH_OUT :
      storeUserData('', '');

      return {};

    default:
      return state;
  }
};

function storeUserData(user, token) {
  sessionStorage.setItem('user', user);
  sessionStorage.setItem('authToken', token);
}

// Export Reducer
export default AuthReducer;
