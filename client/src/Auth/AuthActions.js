import callApi from '../util/apiCaller';

export function signUpRequest(user) {
  return (dispatch) => {
    return callApi('signup', 'post', {
        email: user.email,
        password: user.password,
      },
    ).then((res) => {
      return res
    });
  };
}

export function loginRequest(user) {
  return async (dispatch) => {
    return callApi('login', 'post', {
        email: user.email,
        password: user.password,
      },
    ).then((res) => {
      localStorage.setItem("token", res.token);
      return res
    })
  };
}