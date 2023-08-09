import ReactDOM from "react-dom/client";
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import posts from './Post/PostReducer';
import auth from './Auth/AuthReducer';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const initialStore = configureStore({
    reducer: { auth, posts },
    middleware: [thunk],
  });

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App store={initialStore}/>
  </BrowserRouter>
);