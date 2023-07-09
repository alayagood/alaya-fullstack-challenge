import {USER_LOGIN} from "./UserActions";
import {getToken} from "../util/token";
import jwt from 'jsonwebtoken';

const token = getToken();
const decoded = jwt.decode(token);

const initialState = {token: token, username: decoded && decoded.user.username};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN :
            return {
                username: action.user.username,
                token: action.user.token,
                redirectHome: true
            };
        default:
            return state;
    }
}

export default UserReducer;