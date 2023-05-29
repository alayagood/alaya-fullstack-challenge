import {logoutSuccess} from "../User/UserAction";

export default async (response, dispatch) => {
    const status = response.status;

    try {
        if (response.ok === true) {
            return await response.json();
        } else {
            switch (status) {
                case 401:
                    dispatch(logoutSuccess());
                    break;
                case 403:
                    return Promise.reject({status, message: "Unauthorized"});
                case 500:
                    return Promise.reject({status, message: "Server error"});
                default:
                    return Promise.reject({status, message: "Unknown error"});
            }
        }
    } catch (e) {
        console.log('error', e);
    }


}