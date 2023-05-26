import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import LoginPage from './Auth/LoginPage/LoginPage';
import RegisterPage from './Auth/RegisterPage/RegisterPage';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Navbar from './Nav/components/Navbar';

const theme = createTheme({
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
                <Navbar />
                <div className="w-100 pt-5 mt-5">
                    <Provider store={props.store}>
                        <BrowserRouter>
                            <Switch>
                                <Route path="/" exact component={PostListPage} />
                                <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                                <Route path="/login" exact component={LoginPage} />
                                <Route path="/register" exact component={RegisterPage} />
                            </Switch>
                        </BrowserRouter>
                    </Provider>
                    <NotificationContainer />
                </div>
            </div>
        </ThemeProvider>
    );
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
