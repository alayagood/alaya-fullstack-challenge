import React from 'react';
import * as ReactDOM from 'react-dom';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import posts from './Post/PostReducer';
import auth from './Auth/AuthReducer';
import './index.css';
import App from './App';

// TODO: Refactor this section

const SESSION_STORAGE_KEY = 'session_state';

function getSessionStorage() {
	try {
		const state = sessionStorage.getItem(SESSION_STORAGE_KEY);

		return state ? JSON.parse(state) : undefined;
	} catch (error) {
		console.error(error);

		return undefined;
	}
}

// TODO: Fix issue that is updating the state with null values from the api
function saveSessionStorage(state) {
	try {
		const serialisedState = JSON.stringify(state);

		sessionStorage.setItem(SESSION_STORAGE_KEY, serialisedState);
	} catch (e) {
		console.warn(e);
	}
}

const REDUX_ENHANCERS = [applyMiddleware(thunk)];

const store = createStore(
	combineReducers({ posts, auth }),
	getSessionStorage() || {},
	compose(...REDUX_ENHANCERS)
);

store.subscribe(() => saveSessionStorage(store.getState()));

ReactDOM.render(<App store={store} />, document.getElementById('root'));
