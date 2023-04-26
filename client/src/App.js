import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

// import components
import Navbar from './Nav/components/Navbar';
// import pages
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import AuthSignInPage from './Auth/pages/AuthSignInPage/AuthSignInPage';
import AuthSignUpPage from './Auth/pages/AuthSignUpPage/AuthSignUpPage';
import RequireAuth from './Auth/components/RequireAuth';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function PostsApp() {
    return (
        <div className="w-100">
            <Navbar />
            <div className="w-100 pt-5 mt-5">
                <Switch>
                    <Route exact path="/posts" component={PostListPage} />
                    <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                </Switch>
            </div>
        </div>
    );
}

function App(props) {
    return (
        <ThemeProvider theme={theme}>
            <div className="container">
                <Provider store={props.store}>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/posts">
                                <RequireAuth>
                                    <PostsApp />
                                </RequireAuth>
                            </Route>
                            <Route path="/signin" component={AuthSignInPage} />
                            <Route path="/signup" component={AuthSignUpPage} />
                            <Route path="/" exact>
                                <Redirect to="/signin" />
                            </Route>
                            <Route path="*" exact>
                                <Redirect to="/signin" />
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </div>
        </ThemeProvider>
    );
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
