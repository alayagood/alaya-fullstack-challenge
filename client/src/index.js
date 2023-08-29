import React from 'react'
import { createRoot } from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';

import rootReducer from './store/reducers';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const rootElement = document.getElementById('root');
if(rootElement) {
    const root = createRoot(rootElement);   
    root.render(<App store={store} />);
}

