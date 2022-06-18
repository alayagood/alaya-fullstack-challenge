import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { ConnectedRouter } from "connected-react-router";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { history, persistor } from ".";
import LoginPage from "./LoginOrSignup/LoginPage";
import SignupPage from "./LoginOrSignup/SignupPage";
import LogoutPage from "./Logout/LogoutPage";
import ManagePage from "./Manage/ManagePage";
import Navbar from "./Nav/components/Navbar";
import PostDetailPage from "./Post/pages/PostDetailPage/PostDetailPage";
import PostListPage from "./Post/pages/PostListPage/PostListPage";

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
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <div className="w-100">
              <Navbar />
              <div className="w-100 pt-5 mt-5">
                <Switch>
                  <Route path="/" exact component={PostListPage} />
                  <Route path="/login" exact component={LoginPage} />
                  <Route path="/signup" exact component={SignupPage} />
                  <Route path="/logout" exact component={LogoutPage} />
                  <Route path="/manage" exact component={ManagePage} />
                  <Route
                    path="/posts/:cuid/:slug"
                    exact
                    component={PostDetailPage}
                  />
                </Switch>
              </div>
            </div>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
