import React from "react";
import * as ReactDOM from "react-dom";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import posts from "./Post/PostReducer";
import users from "./User/UserReducer";
import App from "./App";

import "./index.css";

// Middleware and store enhancers
const enhancers = [applyMiddleware(thunk)];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialStore = createStore(
  combineReducers({ posts, users }),
  {},
  composeEnhancers(...enhancers)
);

ReactDOM.render(<App store={initialStore} />, document.getElementById("root"));
