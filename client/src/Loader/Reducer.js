import { SET_LOADING } from "@/Loader/Actions";

const initialState = {
    isLoading: false
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_LOADING :
        return {
            ...state,
            isLoading: !!action.loading
        };

    default:
        return state;
    }
};

/* Selectors */

// Is loading
export const getLoading = state => state.loader.isLoading;

// Export Reducer
export default Reducer;
