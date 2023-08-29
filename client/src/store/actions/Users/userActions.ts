import { IUserLogin } from "../../../interfaces/UserLogin";
import userService from "../../../services/users/userService";
import storageService from "../../../services/storage/storageService";
import { IUser } from "../../../interfaces/User";
import { Dispatch } from "redux";
import { AxiosError } from "axios";

export const GET_USER = 'GET_USER';
export const GET_USER_OK = 'GET_USER_OK';
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const CREATE_USER = 'CREATE_USER';
export const RESET_STATE = 'RESET_STATE';

export const actionGetUser = () => ({
  type: GET_USER,
});
  
export const actionGetUserInfoOk = (userInfo: IUser) => ({
  type: GET_USER_OK,
  payload: userInfo as IUser,
});
  
export const actionGetUserError = (message: string) => ({
  type: GET_USER_ERROR,
  payload: message,
});

export const actionCreateUser = (user: IUser) => ({
  type: CREATE_USER,
  payload: user as IUser,
});

export const resetState = () => ({
  type: RESET_STATE
});

export function createNewUser(user: IUser) {
  return async (dispatch: Dispatch) => { 
    try {
      const userRequest = await userService.addUser('users/add', user);
      dispatch(actionCreateUser(userRequest));
    } catch (error) {
      dispatch(actionGetUserError('Error creating user'));
    }
  }
}


export function logUser(user: IUserLogin) {
  return async (dispatch: Dispatch) => {

    dispatch(actionGetUser());

    try {
      const userInfo = await userService.login(user, 'users/login');
      storageService.set('local', 'userName', userInfo.name);
      storageService.set('local', 'userToken', userInfo.token);
      storageService.set('local', 'userRefreshToken', userInfo.refreshToken);
      storageService.set('local', 'userId', userInfo.id);
      storageService.set('session', 'isAuthenticated', true);
      dispatch(actionGetUserInfoOk(userInfo));
      return  

    } catch (error) {
      const err = error as AxiosError
      dispatch(actionGetUserError(err.response?.data.message));
    }
  }
}