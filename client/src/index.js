import React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root'));
