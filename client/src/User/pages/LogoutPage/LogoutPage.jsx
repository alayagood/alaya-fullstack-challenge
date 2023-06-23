import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import {
  Button, Container, Typography, Box, 
} from '@material-ui/core';
import { logout } from '../../UserActions';

function LogoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    Cookie.remove('jwt');
    history.replace('/');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Logging Out Page
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Are you sure you want to log out?
      </Typography>
      <Box textAlign="center">
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default LogoutPage;
