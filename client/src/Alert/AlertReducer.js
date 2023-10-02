const { ALERT, ALERT_CLEARED } = require('./AlertAction');

const initialState = { err: null };

const AlertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT:
      return { ...state, err: action.err };
    case ALERT_CLEARED:
      return { ...state, err: null };
    default:
      return state;
  }
};

export default AlertReducer;
