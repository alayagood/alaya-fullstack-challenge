import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkIfTokenInLocalStorage, getEmailFromToken } from '../../util/auth';

function Navbar() {
  const user = useSelector((x) => x.user);
  const isValidToken = checkIfTokenInLocalStorage(user);
  const email = getEmailFromToken(isValidToken);

  return (
    <AppBar position="fixed">
      <Toolbar className="d-flex flex-row justify-content-between">
        <Typography variant="h6">
          <Link to="/" className="text-white">
            Home
          </Link>
        </Typography>
        <Typography variant="h6" className="text-white">
          {email ? (
            <>
              Welcome, {email}{' '}
              <Link to="/auth/logout" className="text-white">
                (Logout)
              </Link>
            </>
          ) : (
            <Link to="/auth/login" className="text-white">
              Login
            </Link>
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
