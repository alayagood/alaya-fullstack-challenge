import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import { Provider } from 'react-redux';
import { CookiesProvider, useCookies } from 'react-cookie'
import Signup from './Auth/components/Signup';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import Alerter from './Alert/components/Alerter';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App(props) {
  const [cookies, _setCookie, removeCookie] = useCookies(['auth']);
  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <Provider store={props.store}>
            <div className="w-100">
              <Navbar cookies={cookies} removeCookie={removeCookie} />
              <div className="w-100 pt-5 mt-5">
                <Alerter />
                <BrowserRouter>
                    <Switch>
                      <Route path="/" exact render={() => <PostListPage cookies={cookies}/>} />
                      <Route path="/posts/:cuid/:slug" exact render={() => <PostDetailPage cookies={cookies}/>} />
                      <Route path="/signup" exact render={() => <Signup cookies={cookies}/>} />
                    </Switch>
                </BrowserRouter>
              </div>
            </div>
        </Provider>
      </CookiesProvider>
    </ThemeProvider>
);
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
