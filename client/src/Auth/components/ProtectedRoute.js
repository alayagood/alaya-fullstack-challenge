import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ path, exact, component }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Redirect to="/login" />;
  return <Route path={path} exact={exact} component={component} />;
};

ProtectedRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.elementType,
};

export default ProtectedRoute;
