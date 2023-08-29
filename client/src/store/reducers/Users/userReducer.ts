import { IUser } from "../../../interfaces/User";
import { IUserState } from "../../../interfaces/UserState";
import * as actions from "../../actions/Users/userActions";

export const initialState: IUserState = {
    user: {} as IUser,
    errors: false,
    loading: false
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export default function userLoginReducer(state: IUserState = initialState, action: any) {
    switch (action.type) {
        case actions.GET_USER:
            return { ...state, loading: true };
        case actions.GET_USER_OK:
            return { user: action.payload, message: action.payload.message, loading: false, errors: false };
        case actions.GET_USER_ERROR:
            return { message: action.payload, ...state, loading: false, errors: true };  
        case actions.RESET_STATE:
          return initialState;      
      default:
        return state;
    }
  }