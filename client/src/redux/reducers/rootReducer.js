import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    posts: postReducer,
    auth: authReducer,
});
const debugRootReducer = (state, action) => {
    console.log('Current State:', state);
    console.log('Action:', action);

    return rootReducer(state, action);
};

export default debugRootReducer;
