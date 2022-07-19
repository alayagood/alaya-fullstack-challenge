export const SET_LOADING = "SET_LOADING";

export function setLoadingAction(loading) {
    return {
        type: SET_LOADING,
        loading
    };
}

export function setLoading(loading) {
    return async(dispatch) => {
        return dispatch(setLoadingAction(loading));
    };
}