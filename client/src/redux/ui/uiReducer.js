import {
  SNACKBAR_CLEAR,
  SNACKBAR_ERROR,
  SNACKBAR_INFO,
  SNACKBAR_SUCCESS,
  SNACKBAR_VARIANTS,
} from "./uiActions";

const initialState = {
  snackbar: {
    open: false,
    message: "",
    variant: null,
  },
};

// reducers/uiReducer.js
export const UiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SNACKBAR_SUCCESS:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.payload,
          variant: SNACKBAR_VARIANTS.SUCCESS,
        },
      };
    case SNACKBAR_INFO:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.payload,
          variant: SNACKBAR_VARIANTS.INFO,
        },
      };
    case SNACKBAR_ERROR:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.payload,
          variant: SNACKBAR_VARIANTS.ERROR,
        },
      };
    case SNACKBAR_CLEAR:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: false,
        },
      };
    default:
      return state;
  }
};
