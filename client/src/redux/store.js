import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import debugRootReducer from './reducers/rootReducer';

const store = createStore(debugRootReducer, applyMiddleware(thunk));

export default store;