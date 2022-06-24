import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import SignupPage from './User/pages/SignupPage';
import LoginPage from './User/pages/LoginPage';

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
          <div className="w-100">
                <Provider store={props.store}>
                  <Navbar />
                    <div className="w-100 pt-5 mt-5">
                        <BrowserRouter>
                        <Switch>
                            <Route path="/" exact component={PostListPage} />
                            <Route path="/signup" exact component={SignupPage} />
                            <Route path="/login" exact component={LoginPage} />
                            <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                        </Switch>
                        </BrowserRouter>
                    </div>
                </Provider>
          </div>
      </ThemeProvider>
);
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
