import React from 'react';
import * as ReactDOM from 'react-dom';
import storeConfig from './store/store'
import './index.css';
import App from './App';

ReactDOM.render(<App store={storeConfig.initialStore} persistor={storeConfig.persistor}/>, document.getElementById('root'));
