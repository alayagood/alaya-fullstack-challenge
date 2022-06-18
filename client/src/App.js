import React from "react";
import PropTypes from "prop-types";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LoginPage from "./LoginOrSignup/LoginPage";
import LogoutPage from "./Logout/LogoutPage";
import SignupPage from "./LoginOrSignup/SignupPage";
import PostListPage from "./Post/pages/PostListPage/PostListPage";
import PostDetailPage from "./Post/pages/PostDetailPage/PostDetailPage";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Nav/components/Navbar";

const theme = createMuiTheme({
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
        <BrowserRouter>
          <div className="w-100">
            <Navbar />
            <div className="w-100 pt-5 mt-5">
              <Switch>
                <Route path="/" exact component={PostListPage} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/signup" exact component={SignupPage} />
                <Route path="/logout" exact component={LogoutPage} />
                <Route
                  path="/posts/:cuid/:slug"
                  exact
                  component={PostDetailPage}
                />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
