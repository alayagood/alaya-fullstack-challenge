export const SNACKBAR_SUCCESS = "UI/SNACKBAR_SUCCESS";
export const SNACKBAR_INFO = "UI/SNACKBAR_INFO";
export const SNACKBAR_ERROR = "UI/SNACKBAR_ERROR";
export const SNACKBAR_CLEAR = "UI/SNACKBAR_CLEAR";

export const SNACKBAR_VARIANTS = {
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error",
};

export const showSuccessSnackbar = (payload) => (dispatch) =>
  dispatch({ type: SNACKBAR_SUCCESS, payload });

export const showInfoSnackbar = (payload) => (dispatch) =>
  dispatch({ type: SNACKBAR_INFO, payload });

export const showErrorSnackbar = (payload) => (dispatch) =>
  dispatch({ type: SNACKBAR_ERROR, payload });

export const closeSnackbar = () => (dispatch) =>
  dispatch({ type: SNACKBAR_CLEAR });
