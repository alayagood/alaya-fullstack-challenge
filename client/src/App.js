import React from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "@/App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import Loader from "@/Loader/components/Loader";
import Notification from "@/Notification/components/Notification";
import PostListPage from "@/Post/pages/ListPage";
import PostDetailPage from "@/Post/pages/DetailPage";
import LoginPage from "@/Auth/pages/LoginPage";
import RegisterPage from "@/Auth/pages/RegisterPage";
import { setAuth, logout } from "@/Auth/Actions";
import { setAuthToken } from "@/utils/axios";
import { getToken } from "@/utils/token";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/Nav/components/Navbar";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1ecde2"
        }
    }
});

function App(props) {
    const { dispatch } = props.store,
        token = getToken();

    if (token) {
        setAuthToken(token);

        // Decode token and get user info and exp
        const user = jwt_decode(token);

        // Set user and isAuthenticated
        dispatch(setAuth(user));

        // Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds

        if (user.exp < currentTime) {
            // Logout user
            dispatch(logout());
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Provider store={props.store}>
                <CssBaseline/>
                <Loader/>
                <Notification/>
                <div className="w-100">
                    <Navbar/>
                    <div className="w-100 pt-5 mt-5">
                        <BrowserRouter>
                            <Switch>
                                <Route path="/" exact component={PostListPage}/>
                                <Route path="/posts/:cuid/:slug" exact component={PostDetailPage}/>
                                <Route path="/login" exact component={LoginPage}/>
                                <Route path="/register" exact component={RegisterPage}/>
                            </Switch>
                        </BrowserRouter>
                    </div>
                </div>
            </Provider>
        </ThemeProvider>
    );
}

App.propTypes = {
    store: PropTypes.object.isRequired
};

export default App;
