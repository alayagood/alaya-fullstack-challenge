import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import PostListPage from "./Post/pages/PostListPage/PostListPage";
import PostDetailPage from "./Post/pages/PostDetailPage/PostDetailPage";
import UserLoginPage from "./User/pages/UserLoginPage/UserLoginPage";
import UserSignupPage from "./User/pages/UserSignupPage/UserSignupPage";
import ProtectedRoute from "./Auth/components/ProtectedRoute";
import Navbar from "./Nav/components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1ecde2",
    },
  },
});

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={props.store}>
        <div className="w-100">
          <Navbar />
          <div className="w-100 pt-5 mt-5">
            <BrowserRouter>
              <Switch>
                <ProtectedRoute path="/" exact component={PostListPage} />
                <ProtectedRoute
                  path="/posts/:cuid/:slug"
                  exact
                  component={PostDetailPage}
                />
                <ProtectedRoute
                  inverse
                  path="/login"
                  exact
                  component={UserLoginPage}
                />
                <ProtectedRoute
                  inverse
                  path="/signup"
                  exact
                  component={UserSignupPage}
                />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
