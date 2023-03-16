import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import { Provider, useDispatch, useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import RegisterPage from './User/pages/RegisterPage/RegisterPage';
import { getUserRequest } from './User/UserActions';
import LogoutPage from './User/pages/LogoutPage/LogoutPage';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function Layout() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.data);

    useEffect(() => {
        dispatch(getUserRequest());
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className="w-100">
            <BrowserRouter>
                <div className="w-100 pt-5 mt-5">
                    <Navbar isLoggedIn={!!user?.accountName} />
                    <Switch>
                        <Route path="/" exact component={PostListPage} />
                        <Route path="/auth" exact component={RegisterPage} />
                        <Route path="/logout" exact component={LogoutPage} />
                        <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />                    
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

function App(props) {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={props.store}>
            <Layout />
        </Provider>
      </ThemeProvider>
    );
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
