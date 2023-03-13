import callApi from '../util/apiCaller';

export const CREATE_USER = 'CREATE_USER';

export function createUser(user) {
  return {
    type: CREATE_USER,
    user,
  };
}

export function createUserRequest(user) {
  return (dispatch) => {
    return callApi('user', 'post', user).then(() => {
      const { password, ...data } = user;
      dispatch(createUser(data));
    });
  };
}
