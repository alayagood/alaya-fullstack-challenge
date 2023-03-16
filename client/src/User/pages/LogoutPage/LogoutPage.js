import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../UserActions';
import { useHistory } from 'react-router-dom';

export function LogoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(async d => {
      await logoutRequest()(d);
      setTimeout(() => history.push('/'), 1000);
    });
  }, []);

  return (
    <div className="container">
      <Typography variant="h1" align="center">Logging out...</Typography>
    </div>
  )
};

export default LogoutPage;