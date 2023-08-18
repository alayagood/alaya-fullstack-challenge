import React from 'react';
import thunk from 'redux-thunk';
import { createRoot } from 'react-dom/client';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';

import posts from './Post/PostReducer';
import auth from './Auth/AuthReducer';
import './index.css';
import App from './App';

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk),
];

const initialStore = createStore(combineReducers({
    posts,
    auth,
}), { }, compose(...enhancers));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App store={initialStore}/>);