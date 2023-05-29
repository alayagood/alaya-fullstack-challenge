import {CLEAR_NOTIFICATION_MESSAGE, SET_APPLICATION_ERROR, SET_NOTIFICATION_MESSAGE} from "./AppActions";

const initialState = {app: {notificationMessage: null}, error: {message: null, status: null}};

const AppReducer = (state = initialState, action) => {
    console.log("AppReducer", action);
    switch (action.type) {
        case SET_APPLICATION_ERROR:
            return {
                ...state,
                error: action.error
            };
        case SET_NOTIFICATION_MESSAGE:
            return {
                ...state,
                notificationMessage: action.notificationMessage
            };
        case CLEAR_NOTIFICATION_MESSAGE:
            return {
                ...state,
                notificationMessage: null
            };

        default:
            return state;
    }
};

export default AppReducer;