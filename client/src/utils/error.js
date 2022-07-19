import { error } from "react-notification-system-redux";
import { logout } from "@/Auth/Actions";

const getErrorMessage = (err, dispatch) => {
    if (err.response) {
        switch (err.response.status) {
        case 400:
            return err.response.data.error;
        case 404:
            return "Not found.";
        case 401:
            dispatch(logout());
            return "Unauthorized Access! Please login again";
        case 403:
            return "Forbidden! You are not allowed to access this resource.";
        default:

        }
    }

    if (err.message) {
        return err.message;
    }

    return "Your request could not be processed. Please try again.";
};

const handleError = (err, dispatch, title = "Something went wrong, please Try Again!") => {
    const message = getErrorMessage(err, dispatch),
        unsuccessfulOptions = {
            title: `${title}`,
            message: message,
            position: "tr",
            autoDismiss: 5
        };

    dispatch(error(unsuccessfulOptions));
};

export default handleError;
