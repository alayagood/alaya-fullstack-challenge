import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "../../User/UserSelectors";

const ProtectedRoute = ({ path, exact, component, inverse }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
