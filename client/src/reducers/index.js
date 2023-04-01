import { combineReducers } from 'redux';
import authReducer from './authReducers';
import postReducer from '../Post/PostReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer
});

export default rootReducer;
