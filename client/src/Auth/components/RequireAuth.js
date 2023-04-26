import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


const RequireAuth = ({ children }) => {

  const { session } = useSelector(state => state.auth);

  if (!session) {
    return (
      <Redirect to="/signin" />
    );
  };

  return (<>{children}</>);

}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired
};

export default RequireAuth;
