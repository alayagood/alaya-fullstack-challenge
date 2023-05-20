import callApi from "../util/apiCaller";

export const ADD_USER = "ADD_USER";

export function setUser(user) {
  // Set JWT
  return {
    type: ADD_USER,
    user,
  };
}

export function createNewUser(user) {
  console.log("addUserRequest");
  return async (dispatch) => {
    const res = await callApi("users/create", "post", {
      user: {
        username: user.username,
        password: user.password,
      },
    });
    console.log(res);
    dispatch(setUser(res.user));
  };
}
