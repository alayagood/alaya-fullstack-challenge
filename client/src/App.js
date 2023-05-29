import React from 'react';
import PropTypes from 'prop-types';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import UserSignIn from "./User/components/UserSignIn";
import UserSignUp from "./User/components/UserSignUp";
import AppErrorNotification from "./components/application/components/AppErrorNotification";

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
                <div className="w-100 pt-5 mt-5">
                    <AppErrorNotification/>
                    <BrowserRouter>
                        <Navbar/>
                        <Switch>
                            <Route path="/" exact component={PostListPage}/>
                            <Route path="/posts/:cuid/:slug" exact component={PostDetailPage}/>
                            <Route path="/sign-in" exact component={UserSignIn}/>
                            <Route path="/sign-up" exact component={UserSignUp}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        </ThemeProvider>
    );
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
