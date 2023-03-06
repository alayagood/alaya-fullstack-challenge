import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import SignInPage from './Auth/pages/SignIn/SignIn';
import SignUpPage from './Auth/pages/Signup/Signup';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App({ store }) {
  return (
      <ThemeProvider theme={theme}>
          <div className="w-100">
              <Navbar />
              <div className="w-100 pt-5 mt-5">
                  <Provider store={store}>
                    <BrowserRouter>
                      <Switch>
                          <Route path="/" exact component={PostListPage} />
                          <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                          <Route path="/signin" exact component={SignInPage} />
                          <Route path="/signin" exact component={SignUpPage} />
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
