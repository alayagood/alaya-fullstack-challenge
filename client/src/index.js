import React from 'react';
import * as ReactDOM from 'react-dom';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk),
];

const initialStore = createStore(rootReducer, {}, compose(...enhancers));

ReactDOM.render(<Provider store={initialStore}><App /></Provider>, document.getElementById('root'));
