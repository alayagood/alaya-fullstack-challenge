import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import { Provider } from 'react-redux';
import LoginPage from './Auth/pages/Login/LoginPage'
import RegisterPage from './Auth/pages/Register/RegisterPage'

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import Logo from './logo.svg';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App(props) {
    return (
        <Provider store={props.store}>
            <ThemeProvider theme={theme}>
                <div className="w-100">
                    <Navbar />
                    <div className="w-100 pt-5 mt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex align-items-center">
                                    <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px' }} />
                                    <h1 className="mt-4">
                                        Alaya Blog
                                    </h1>
                                </div>
                            </div>
                            <hr />
                            <BrowserRouter>
                                <Switch>
                                    <Route path="/" exact component={PostListPage} />
                                    <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                                    <Route path="/register" exact component={RegisterPage} />
                                    <Route path="/login" exact component={LoginPage} />
                                </Switch>
                            </BrowserRouter>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </Provider>
    );
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
