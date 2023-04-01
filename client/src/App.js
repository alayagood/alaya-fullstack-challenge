import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import Login from './Auth/components/login';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App(props) {
    const user = useSelector((state) => state.auth?.user);

    return (
        <ThemeProvider theme={theme}>
            <div className="w-100">
                <Navbar />
                <div className="w-100 pt-5 mt-5">
                    <BrowserRouter>
                        <Switch>
                            <Route path="/login">
                                {user ? <Redirect to="/" /> : <Login />}
                            </Route>
                            <Route path="/" >
                                {!user ? <Redirect to="/login" /> : <PostListPage />}
                            </Route>
                            <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        </ThemeProvider>
    );
}

// App.propTypes = {
//     store: PropTypes.object.isRequired,
// };

export default App;
