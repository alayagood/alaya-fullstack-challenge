import { combineReducers, createStore,  applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

import posts from './../Post/PostReducer';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({ posts }))

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk),
];

const initialStore = createStore(persistedReducer, {}, composeWithDevTools(...enhancers));
const persistor = persistStore(initialStore)

export default { initialStore, persistor }
