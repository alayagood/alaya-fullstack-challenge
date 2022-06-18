import React from "react";
import * as ReactDOM from "react-dom";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { PostReducer } from "./redux/posts";
import { UserReducer } from "./redux/user";
import "./index.css";
import App from "./App";

// Middleware and store enhancers
const enhancers = [applyMiddleware(thunk)];

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const initialStore = createStore(
  combineReducers({ posts: PostReducer, user: UserReducer }),
  {},
  composeEnhancers(...enhancers)
);

ReactDOM.render(<App store={initialStore} />, document.getElementById("root"));
