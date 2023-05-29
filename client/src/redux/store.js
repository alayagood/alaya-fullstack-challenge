import { configureStore } from "@reduxjs/toolkit";
import user from '../User/UserReducer';
import posts from '../Post/PostReducer';
import app from '../components/application/AppReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import {combineReducers} from "redux";

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel1
}

const reducers = combineReducers({ user,  posts, app});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

const persistor = persistStore(store);
export { persistor, store };