import { Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkIfTokenInLocalStorage, getEmailFromToken } from '../../util/auth';
import { logout } from '../AuthActions';

export default function Logout() {
  const dispatch = useDispatch();
  const user = useSelector((x) => x.user);
  const isValidToken = checkIfTokenInLocalStorage(user);
  const email = getEmailFromToken(isValidToken);
  let history = useHistory();

  let seconds = 1;
  setTimeout(() => {
    dispatch(logout());
    history.push('/');
  }, seconds * 1000);

  return (
    <div className="container">
      <div className="row">
        {email ? (
          <Typography variant="h6" className="col-12">
            You are logging out from {email}...
          </Typography>
        ) : (
          <Typography variant="h6" className="col-12">
            You are not logged in.
          </Typography>
        )}
      </div>
    </div>
  );
}
