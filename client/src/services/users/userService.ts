import { IUser } from "../../interfaces/User";
import { IUserLogin } from "../../interfaces/UserLogin";
import { requestService } from "../requests/requestService"

const userService = {
    login: async ( user: IUserLogin, endpoint:string ) => {
        const loginRequest = await requestService.post(endpoint, user);
        return loginRequest.data;
    },

    addUser: async (endpoint:string, user: IUser) => {
        const userRequest = await requestService.post(endpoint, user);
        return userRequest.data;
    }
}

export default userService