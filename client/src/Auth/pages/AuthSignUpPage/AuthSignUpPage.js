import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
// Import Components
import AuthSignUpWidget from '../../components/AuthSignUpWidget';
// Import Actions
import { signUpRequest } from '../../AuthActions';

const AuthSignInPage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, error } = useSelector(state => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      setOpen(true);
    }
  }, [user]);

  const handleRedirect = () => {
    history.push('/signin');
  }

  const handleSignUp = (user) => {
    dispatch(signUpRequest(user));
  };

  return (
    <div className="container mt-5">
      <AuthSignUpWidget signup={handleSignUp} error={error} />
      <Dialog open={open}>
        <DialogTitle>User created successfully</DialogTitle>
        <DialogActions>
          <Button variant='contained' color='primary' onClick={handleRedirect}>Sign In</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default AuthSignInPage;
