import axios, { setAuthToken } from "@/utils/axios";
import { success } from "react-notification-system-redux";
import { setToken, clearToken } from "@/utils/token";
import handleError from "@/utils/error";
import jwt_decode from "jwt-decode";
import { setLoading } from "@/Loader/Actions";

const API_ENDPOINT_LOGIN = "/login";
const API_ENDPOINT_REGISTER = "/register";

export const SET_AUTH = "SET_AUTH";
export const CLEAR_AUTH = "CLEAR_AUTH";

export function setAuth(user) {
    return {
        type: SET_AUTH,
        user
    };
}

export function clearAuth() {
    return {
        type: CLEAR_AUTH
    };
}

export function loginRequest(newUser) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const res = await axios.post(`${API_ENDPOINT_LOGIN}`, {
                    email: newUser.email,
                    password: newUser.password
                }),
                { token } = res.data,
                user = jwt_decode(token);

            setToken(token);
            setAuthToken(token);

            const successfulOptions = {
                title: `You have logged in successfully!`,
                position: "tr",
                autoDismiss: 5
            };
            dispatch(success(successfulOptions));

            dispatch(setAuth(user));
        } catch (error) {
            const title = `Please try to login again!`;
            handleError(error, dispatch, title);
            dispatch(setLoading(false));
        }
    };
}

export function registerRequest(newUser) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const res = await axios.post(`${API_ENDPOINT_REGISTER}`, {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    password: newUser.password
                }),
                { token } = res.data,
                user = jwt_decode(token);

            setToken(token);
            setAuthToken(token);

            const successfulOptions = {
                title: `You have registered successfully!`,
                position: "tr",
                autoDismiss: 5
            };
            dispatch(success(successfulOptions));

            dispatch(setAuth(user));
        } catch (error) {
            const title = `Please try to register again!`;
            handleError(error, dispatch, title);
            dispatch(setLoading(false));
        }
    };
}

export function logout() {
    return async(dispatch) => {
        clearToken();

        setAuthToken();

        dispatch(clearAuth({}));
    };
}