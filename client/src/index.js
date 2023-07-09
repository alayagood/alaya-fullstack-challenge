import React from 'react';
import ReactDOM from "react-dom/client";
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import posts from './Post/PostReducer';
import user from './User/UserReducer';
import './index.css';
import App from './App';

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk),
];

const initialStore = createStore(combineReducers({ posts, user }), { }, compose(...enhancers));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App store={initialStore}/>);