import callApi from '../util/apiCaller';

export const SET_USER = 'SET_USER';
export const DELETE_USER = 'DELETE_USER';

function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

function deleteUser() {
  return {
    type: DELETE_USER,
  }
}

export function createUserRequest(user) {
  return async (dispatch) => {
    await callApi('user', 'post', user);
    const { email, password } = user;
    return loginRequest({ email, password })(dispatch);
  };
}

export function getUserRequest() {
  return async (dispatch) => {
    const user = await callApi('user', 'get');
    dispatch(setUser(user));
  }
}

export function loginRequest(login) {
  return async (dispatch) => {
    await callApi('login', 'post', login);
    const userReq = getUserRequest();
    return await userReq(dispatch);
  }
}

export function logoutRequest() {
  return async (dispatch) => {
    await callApi('logout', 'delete', {});
    dispatch(deleteUser());
  }
}
