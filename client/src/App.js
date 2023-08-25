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
import LoginPage from "./Auth/pages/LoginPage";
import SignupPage from "./Auth/pages/SignupPage";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App(props) {
  return (
      <Provider store={props.store}>
          <ThemeProvider theme={theme}>
                  <div className="w-100 pt-5 mt-5">
                      <BrowserRouter>
                          <Navbar />
                          <Switch>
                              <Route path="/" exact component={PostListPage} />
                              <Route path="/posts/:cuid" exact component={PostDetailPage} />
                              <Route path="/login" exact component={LoginPage} />
                              <Route path="/signup" exact component={SignupPage} />
                          </Switch>
                      </BrowserRouter>
                  </div>
          </ThemeProvider>
      </Provider>
);
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
