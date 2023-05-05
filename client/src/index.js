import React from "react";
import * as ReactDOM from "react-dom";
import {combineReducers, createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import accessReducer from "./Access/AccessReducer";
import postReducer from "./Post/PostReducer";
import "./index.css";
import App from "./App";

// Middleware and store enhancers
const enhancers = [applyMiddleware(thunk)];

const initialStore = createStore(
  combineReducers({posts: postReducer, user: accessReducer}),
  compose(...enhancers)
);

ReactDOM.render(<App store={initialStore} />, document.getElementById("root"));
