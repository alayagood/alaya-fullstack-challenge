import {SET_APPLICATION_ERROR} from "./AppActions";

const initialState = {app: {}, error: {message: null, status: null}};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APPLICATION_ERROR:
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
};

export default AppReducer;