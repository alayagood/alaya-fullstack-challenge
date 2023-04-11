import callApi from '../util/apiCaller';
import authService from '../util/authService';

// Export Constants
export const ADD_USER = 'ADD_USER';
export const LOGIN_USER = 'LOGIN_USER';

// Export Actions
export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function loginUser(token) {
authService.setToken(token);
  return {
    type: LOGIN_USER,
    token,
  };
}

export function addUserRequest(user) {
  return (dispatch) => {
    return callApi('users', 'post', {
      user: {
        userName: user.userName,
        password: user.password
    }
    }).then(res => dispatch(addUser(res.user)));
  };
}

export function loginUserRequest(user) {
  return (dispatch) => {
    return callApi('users/login', 'post', {
      user: {
        userName: user.userName,
        password: user.password
      }
    }).then(res => 
        dispatch(loginUser(res.token))
    )
  }
}


