import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from '../Post/PostReducer';
import authReducer from '../Auth/AuthReducer';

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk),
];

const store = createStore(combineReducers({
    posts: postsReducer,
    auth: authReducer,
}), { }, compose(...enhancers));

export default store;
