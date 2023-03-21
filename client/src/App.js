import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import LoginPage from './Auth/pages/LoginPage';
import { Provider, useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import PrivateRoute from './Auth/components/PrivateRoute';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App(props) {
    // const user = useSelector((state) => state.auth.user);

    return (
        <Provider store={props.store}>
            <ThemeProvider theme={theme}>
                <div className="w-100">
                    <Navbar />
                    <div className="w-100 pt-5 mt-5">
                        <BrowserRouter>
                            <Switch>
                                <Route path="/" exact component={() => <Redirect to="/posts" /> } />
                                <PrivateRoute path="/posts" exact component={PostListPage} />
                                <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                                <Route path="/login" exact component={LoginPage} />
                            </Switch>
                        </BrowserRouter>
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
