import React from 'react';
import * as ReactDOM from 'react-dom';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import posts from './Post/PostReducer';
import auth from './Auth/AuthReducer';
import './index.css';
import App from './App';
import { getSessionStorage, saveSessionStorage } from './util/storage';

const REDUX_ENHANCERS = [applyMiddleware(thunk)];

const store = createStore(
	combineReducers({ posts, auth }),
	getSessionStorage() || {},
	compose(...REDUX_ENHANCERS)
);

store.subscribe(() => saveSessionStorage(store.getState()));

ReactDOM.render(<App store={store} />, document.getElementById('root'));
