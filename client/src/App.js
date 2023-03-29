import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import Login from './User/pages/LoginSignupPage/Login';
import SignUp from './User/pages/LoginSignupPage/SignUp';
import ProtectedRoute from './routes/ProtectedRoute';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';

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
            <Provider store={props.store}>
                <div className="w-100">
                    <Navbar />
                    <div className="w-100 pt-5 mt-5">
                        <BrowserRouter>
                        <Switch>
                            <ProtectedRoute
                                exact
                                path="/"
                                component={PostListPage}
                            />
                            <ProtectedRoute
                                exact
                                path="/posts/:cuid/:slug"
                                component={PostDetailPage}
                            />
                            <Route path="/login" exact component={Login} />
                            <Route path="/signup" exact component={SignUp} />
                        </Switch>
                        </BrowserRouter>
                    </div>
                </div>
            </Provider>
        </ThemeProvider>
    );
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
