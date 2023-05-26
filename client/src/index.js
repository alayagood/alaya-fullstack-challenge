import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import debugRootReducer from './redux/reducers/rootReducer';
import App from './App';

const store = createStore(debugRootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App  store={store}/>
    </Provider>,
    document.getElementById('root')
);
