import React from 'react';

import { Provider } from 'react-redux';
import { requestService } from './services/requests/requestService';
import { config } from '../src/config'; 
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';

import PostListPage from './pages/Post/PostList/PostListPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import Navbar from './components/Nav/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProtectedRoute from './utils/protectedRoute';
import UserPostPage from './pages/UserPosts/UserPostPage';
import AddPostPage from './pages/AddPosts/AddPostsPage';
import PostDetail from './pages/Post/PostDetail/PostDetailPage';
import { Store } from 'redux';

const theme = createTheme({
    palette: {
      primary: lime,
      secondary: purple,
    },
  });

interface IAppProps {
    store: Store
}

const App: React.FC<IAppProps> = ({store}): JSX.Element => {
  const { apiUrl } = config;
  requestService.setDomain(apiUrl);

  return (
        <ThemeProvider theme={theme}>
          <div className="w-100">
            <BrowserRouter>
             <Provider store={store}>
              <Navbar />
              <div className="w-100 pt-5 mt-5">
                  
                      <Switch>
                          <Route path="/" exact component={PostListPage} />
                          <Route path="/register" exact component={RegisterPage} />
                          <Route path="/login" exact component={LoginPage} />
                          <Route path="/post-detail/:slug/:cuid" exact component={PostDetail} />
                          <ProtectedRoute>
                            <>
                              <Route path="/user-posts" exact component={UserPostPage} />
                              <Route path="/add-posts" exact component={AddPostPage} />
                            </>
                          </ProtectedRoute>
                      </Switch>
                  
              </div>
              </Provider>
              </BrowserRouter>
          </div>
        </ThemeProvider>
    );
}


export default App;
