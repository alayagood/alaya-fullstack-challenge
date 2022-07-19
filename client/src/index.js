import React from "react";
import * as ReactDOM from "react-dom";
import { reducer as notifications } from "react-notification-system-redux";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import auth from "@/Auth/Reducer";
import loader from "@/Loader/Reducer";
import posts from "@/Post/Reducer";
import "@/index.css";
import App from "@/App";

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk)
];

const initialStore = createStore(combineReducers({
    auth,
    loader,
    posts,
    notifications
}), {}, compose(...enhancers));

ReactDOM.render(<App store={initialStore}/>, document.getElementById("root"));
