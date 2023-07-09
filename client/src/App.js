import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';

import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import UserSignUpPage from "./User/pages/UserSignUpPage/UserSignUpPage";
import Navbar from "./Nav/components/Navbar";
import UserLoginPage from "./User/pages/UserLoginPage/UserLoginPage";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App(props) {
    return (
        <ThemeProvider theme={theme}>
            <div className="w-100">
                <Provider store={props.store}>
                <Navbar />
                    <div className="w-100 pt-5 mt-5">
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" exact element={<PostListPage/>} />
                                    <Route path="/posts/:cuid/:slug" exact element={<PostDetailPage/>} />
                                    <Route path="/users/signup" exact element={<UserSignUpPage/>} />
                                    <Route path="/users/login" exact element={<UserLoginPage/>} />
                                </Routes>
                            </BrowserRouter>
                    </div>
                </Provider>
            </div>
        </ThemeProvider>
    );
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
