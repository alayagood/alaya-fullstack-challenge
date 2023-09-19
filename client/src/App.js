import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import apiCaller from './util/apiCaller'
import './App.css';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import Navbar from './Nav/components/Navbar';
import AccessPage from './User/pages/AccessPage/AccessPage';
import { checkAuthentication } from './User/UserActions';
import AlertComponent from './shared/components/Alert/AlertComponent';
import { HTTP_ERROR } from './shared/ErrorReducer';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App(props) {
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.user.accessToken)

    useEffect(() => {
        dispatch(checkAuthentication())
        apiCaller.innerClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }, [accessToken])

    React.useEffect(() => {
        // Here we catch all axios errors in case we want to be lazy and dont handle them anywhere else
        apiCaller.innerClient.interceptors.response.use(
            res => res,
            error => {
                const message = error?.response?.data ? JSON.stringify(error.response.data) : error.toString()
                dispatch({ type: HTTP_ERROR, error: true, message })
                // Propagate the error 
                return Promise.reject(error);
            })
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div className="w-100">
                <BrowserRouter>
                    <AlertComponent />
                    <Navbar />
                    <div className="w-100 pt-5 mt-5">
                        <Switch>
                            <Route path="/" exact component={PostListPage} />
                            <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                            <Route path="/access" exact component={AccessPage} />
                        </Switch>

                    </div>
                </BrowserRouter>
            </div>
        </ThemeProvider >
    );
}

export default App;
