import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ path, exact, component, inverse }) => {
  const { isLoggedIn } = useAuth();
  if (inverse && isLoggedIn) return <Redirect to="/" />;
  if (!inverse && !isLoggedIn) return <Redirect to="/login" />;
  return <Route path={path} exact={exact} component={component} />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
  inverse: PropTypes.bool,
  exact: PropTypes.bool,
};

export default ProtectedRoute;
