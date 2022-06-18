import React from "react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import * as ReactDOM from "react-dom";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
import { PostReducer } from "./redux/posts";
import { UserReducer } from "./redux/user";

export const history = createBrowserHistory();
const persistConfig = {
  key: "alaya-fullstack-challenge-fmg",
  storage,
};

const enhancers = [applyMiddleware(thunk, routerMiddleware(history))];

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    posts: PostReducer,
    user: UserReducer,
  });

const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history)
);

const store = createStore(persistedReducer, {}, composeEnhancers(...enhancers));

export const persistor = persistStore(store);

ReactDOM.render(<App store={store} />, document.getElementById("root"));
