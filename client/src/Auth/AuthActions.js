import callApi from '../util/authCaller';

  export function userLogin(user) {
    return (dispatch) => {
      return callApi('login', 'post', {
        usersname: user.usersname,
        password: user.password,
      }).then(res => {return res;});
    };

  }

  export function userRegister(user) {
    return (dispatch) => {
      return callApi('register', 'post', {
          usersname: user.usersname,
          password: user.password,
      }).then(res => {return res;});
    };
  }