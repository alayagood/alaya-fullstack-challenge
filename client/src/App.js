import React, { useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';

// Import pages
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import LoginPage from './Auth/pages/AuthLoginPage';
import RegisterPage from './Auth/pages/AuthRegisterPage';

// Import components
import Navbar from './Nav/components/Navbar';

// Import Actions
import { loginSuccess } from './Auth/AuthActions';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const token = Cookies.get('jwt');
        if (token) {
            dispatch(loginSuccess(token));
        }
    }, []);

    return (
      <ThemeProvider theme={theme}>
          <div className="w-100">
              <div className="w-100 pt-5">
                    <BrowserRouter>
                      <Navbar />
                      <Switch>
                          <Route path="/" exact component={PostListPage} />
                          <Route path="/login" exact component={LoginPage} />
                          <Route path="/register" exact component={RegisterPage} />
                          <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                          <Redirect from="*" to="/" />
                      </Switch>
                    </BrowserRouter> 
              </div>
          </div>
      </ThemeProvider>
    );
}

export default App;
