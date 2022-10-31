import React from 'react';
import * as ReactDOM from 'react-dom';
import store from './store/store';
import './index.css';
import App from './App';

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
