import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useCookieChange } from '../../hooks/useCookieChange';

function Navbar() {
  const isLoggedIn = useCookieChange('jwt');

  const logoutLink = (
    <Link component={RouterLink} to="/logout" className="text-white pl-4">
      Logout
    </Link>
  );

  const loginLink = (
    <Link component={RouterLink} to="/login" className="text-white pl-4">
      Login
    </Link>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">
          <Link component={RouterLink} to="/" className="text-white">
            Home
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link component={RouterLink} to="/signup" className="text-white pl-4">
            Signup
          </Link>
        </Typography>
        <Typography variant="h6">{isLoggedIn ? logoutLink : loginLink}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
