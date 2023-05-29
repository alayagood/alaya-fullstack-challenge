export const SET_APPLICATION_ERROR = 'SET_APPLICATION_ERROR';
export const SET_NOTIFICATION_MESSAGE = 'SET_NOTIFICATION_MESSAGE';
export const CLEAR_NOTIFICATION_MESSAGE = 'CLEAR_NOTIFICATION_MESSAGE';

export function setApplicationError(error) {
    return {
        type: SET_APPLICATION_ERROR,
        error,
    };
}

export function setNotificationMessage(message) {
    return {
        type: SET_NOTIFICATION_MESSAGE,
        notificationMessage: message,
    };
}
export function clearNotificationMessage(message) {
    return {
        type: SET_NOTIFICATION_MESSAGE,
        notificationMessage: message,
    };
}