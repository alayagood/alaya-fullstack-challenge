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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});


export const AppPaths = {
    LOGIN :'/login',
    SIGNUP :'/signup',
    POSTS: '/posts',
}

function App(props) {
  return (
      <ThemeProvider theme={theme}>
          <Provider store={props.store}>
              <div className="w-100">
                  <BrowserRouter>
                      <Navbar/>
                      <div className="w-100 pt-5 mt-5">
                          <Switch>
                              <Route path="/" exact component={PostListPage}/>
                              <Route path={`${AppPaths.POSTS}/:cuid/:slug`} exact component={PostDetailPage}/>
                          </Switch>
                      </div>
                  </BrowserRouter>
              </div>
          </Provider>
      </ThemeProvider>
);
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
