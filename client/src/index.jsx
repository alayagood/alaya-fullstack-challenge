import React from 'react';
import * as ReactDOM from 'react-dom';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import posts from './Post/PostReducer';
import './index.css';
import App from './App';

const enhancers = [
    applyMiddleware(thunk),
];

const initialStore = createStore(combineReducers({ posts }), { }, compose(...enhancers));

ReactDOM.render(<App store={initialStore}/>, document.getElementById('root'));
