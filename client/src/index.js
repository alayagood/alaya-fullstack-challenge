import React from 'react';
import * as ReactDOM from 'react-dom';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import posts from './Post/PostReducer';
import user from './Auth/AuthReducer';
import './index.css';
import App from './App';

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk),
];

const initialStore = createStore(persistReducer({
    key: 'root',
    storage,
}, combineReducers({ posts, user })), {}, compose(...enhancers));
const persistor = persistStore(initialStore)

ReactDOM.render(<App store={initialStore} persistor={persistor} />, document.getElementById('root'));
