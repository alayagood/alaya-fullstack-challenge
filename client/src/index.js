import React from 'react';
import * as ReactDOM from 'react-dom';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import posts from './Post/PostReducer';
import auth from './Auth/AuthReducer';
import nav from './Nav/NavReducer'
import alert from './Alert/AlertReducer'
import './index.css';
import App from './App';

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk),
];

const initialStore = createStore(combineReducers({ posts, auth, nav, alert }), { }, compose(...enhancers));
const Root = () => <App store={initialStore} />

ReactDOM.render(<Root />, document.getElementById('root'));
