import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import LoginPage from './Login/pages/LoginPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import { Provider } from 'react-redux';
import ProtectedRoute from "../src/util/components/protectedRoute";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import LogoutPage from './Logout/pages/LogoutPage';

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
              <Navbar />
              <div className="w-100 pt-5 mt-5">
                  <Provider store={props.store}>
                    <BrowserRouter>
                      <Switch>
                          <Route path="/login" exact component={LoginPage}/>
                          <ProtectedRoute path="/home" component={PostListPage}/>
                          <ProtectedRoute path="/" exact component={PostListPage} />
                          <ProtectedRoute path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                          <Route path="/logout" exact component={LogoutPage} />

                      </Switch>
                    </BrowserRouter>
                  </Provider>
              </div>
          </div>
      </ThemeProvider>
);
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
