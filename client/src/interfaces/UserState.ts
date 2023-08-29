import { IUser } from "./User";

export interface IUserState {
    user: IUser,
    errors: boolean,
    loading: boolean,
    message?: string
}
  