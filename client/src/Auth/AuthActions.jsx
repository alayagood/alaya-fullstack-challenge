import {fetchData} from '../util/apiCaller';
import { setAuthToken } from './Auth';
import { AuthActions } from '../Enums/Auth';

export const signupSuccess = (user) => {
  return {
    type: AuthActions.SIGNUP_SUCCESS,
    payload: user,
  };
};

export const signupFailure = (error) => {
  return {
    type: AuthActions.SIGNUP_FAILURE,
    payload: error,
  };
};

export const setAuthTokenAndRedirect = (token) => {
  setAuthToken(token);
};

export const signupUserRequestRespose = (dispatch, response) => {
  if (response.user && response.token) { 
    setAuthTokenAndRedirect(response.token); 
    dispatch(signupSuccess({ message: 'User created successfully!' }));
  } else if (response.error) {
    dispatch(signupFailure({ message: response.error }));
  } else {
    dispatch(signupFailure({ message: 'Invalid Credentials' }))
  }  
}

export function signupUserRequest(user) {
  return async (dispatch) => {
    try {
      const response = await fetchData('users/signup', 'post', {      
        email: user.email,
        password: user.password,      
      });
      signupUserRequestRespose(dispatch, response);     
    } catch (error) {
      console.log(error);
    }
  };
}

export const loginSuccess = (user) => {
  return {
    type: AuthActions.LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: AuthActions.LOGIN_FAILURE,
    payload: error,
  };
};

export const loginUserRequestRespose = (dispatch, response) => {
  if (response.user && response.token) {
    setAuthTokenAndRedirect(response.token);
    dispatch(loginSuccess(response.user))
  } else if (response.error) {
    dispatch(loginFailure({ message: response.error }));
  } else {
    dispatch(loginFailure({ message: 'Invalid Credentials' }));
  }
}

export function loginUserRequest(user) {
  return async (dispatch) => {
    try {
      const response = await fetchData('users/login', 'post', {      
        email:  user.email,
        password: user.password,      
      });
      loginUserRequestRespose(dispatch, response);  
    } catch (error) {
      console.log(error);
    }
  };
}