import React from 'react';
import './App.css';

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './Nav/components/Navbar';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import Login from './Auth/pages/Login';
import Logout from './Auth/pages/Logout';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="w-100 pt-5 mt-5">
          <Provider store={props.store}>
            <BrowserRouter>
              <Navbar />
              <Switch>
                <Route path="/" exact component={PostListPage} />
                <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/logout" component={Logout} />
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
