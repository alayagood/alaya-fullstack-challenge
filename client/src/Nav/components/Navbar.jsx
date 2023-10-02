import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useDispatch } from 'react-redux';

import Auth from '../../Auth/components/Auth';
import { signinRequest } from '../../Auth/AuthActions';
import { redirect } from '../NavActions';

function Navbar({ cookies, removeCookie }) {
  const dispatch = useDispatch();
  const signinAction = (email, password) => {
    dispatch(signinRequest(email, password));
  };
  const redirectToSignupAction = () => {
    dispatch(redirect('/signup'));
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">
          <Link href="/" className="text-white">
            Home
          </Link>
        </Typography>
        <div className="toolbarButton">
          <Auth
            redirectToSignupAction={redirectToSignupAction}
            signinAction={signinAction}
            cookies={cookies}
            removeCookie={removeCookie}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
