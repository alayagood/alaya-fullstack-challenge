// errorReducer.js
const initialState = {
  error: null,
  message: null,
};
export const CLEAR_ERROR = "CLEAR_ERROR"
export const HTTP_ERROR = "HTTP_ERROR"

const errorReducer = (state = initialState, action) => {
  if (action.type === CLEAR_ERROR) {
    return initialState;
  }

  if (action.type.endsWith('_ERROR')) {
    return {
      error: action.error,
      message: action.message
    };
  }

  return state;
};

export default errorReducer;
