import React from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import { Toaster } from 'react-hot-toast';

import PostListPage from "./Post/pages/PostListPage/PostListPage";
import PostDetailPage from "./Post/pages/PostDetailPage/PostDetailPage";
import SignupPage from "./User/pages/SignupPage/SignupPage";
import LoginPage from "./User/pages/SignupPage/LoginPage";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Nav/components/Navbar";
import LogoutPage from "./User/pages/LogoutPage/LogoutPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1ecde2",
    },
  },
});

function App({ store }) {
  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <div className="w-100">
        <div className="w-100 pt-5 mt-5">
          <Provider store={store}>
            <BrowserRouter>
              <Navbar />
              <Switch>
                <Route path="/" exact component={PostListPage} />
                <Route
                  path="/posts/:cuid/:slug"
                  exact
                  component={PostDetailPage}
                />
                <Route path="/signup" exact component={SignupPage} />
                <Route path="/login" exact component={LoginPage} />
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
  store: PropTypes.isRequired,
};

export default App;
