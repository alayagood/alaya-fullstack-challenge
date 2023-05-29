export const SET_APPLICATION_ERROR = 'SET_APPLICATION_ERROR';

export function setApplicationError(error) {
    return {
        type: SET_APPLICATION_ERROR,
        error,
    };
}