// errorReducer.js
const initialState = {
  error: null,
  message: null,
};
export const CLEAR_ERROR = "CLEAR_ERROR"


const errorReducer = (state = initialState, action) => {
  if (action.type.endsWith('_ERROR')) {
    return {
      error: action.error,
      message: action.message
    };
  } else if (action.type === 'CLEAR_ERROR') {
    return initialState;
  }
  return state;
};

export default errorReducer;
