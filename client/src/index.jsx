import React from "react";
import * as ReactDOM from "react-dom";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import posts from "./Post/PostReducer";
import user from "./User/UserReducer";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";
import App from "./App";

// Middleware and store enhancers
const enhancers = [applyMiddleware(thunk)];

const composedEnhancers = composeWithDevTools(...enhancers);

// const initialStore = createStore(combineReducers({ posts }), { }, compose(...enhancers));
const initialStore = createStore(
  combineReducers({ posts, user }),
  {},
  composedEnhancers
);

ReactDOM.render(<App store={initialStore} />, document.getElementById("root"));
