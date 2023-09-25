import React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import posts from './Post/PostReducer';
import user from './User/UserReducer';
import error, { HTTP_ERROR } from './shared/ErrorReducer';
import './index.css';
import App from './App';
import apiCaller from './util/apiCaller'

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk),
];

const store = createStore(combineReducers({ posts, user, error }), compose(...enhancers));

apiCaller.innerClient.interceptors.response.use(
    res => res,
    error => {
        const message = error?.response?.data ? JSON.stringify(error.response.data) : error.toString()
        store.dispatch({ type: HTTP_ERROR, error: true, message })
        // Propagate the error 
        return Promise.reject(error);
    })

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
