import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, TextField, Container, Grid, Typography, 
} from '@material-ui/core';

function SignupPage({
  submitButtonText = 'Sign up',
  email,
  password,
  errorMessages = '',
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
}) {
  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              {submitButtonText}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {submitButtonText}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center" style={{ color: '#FFC0CB' }}>
              {errorMessages}
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

SignupPage.propTypes = {
  submitButtonText: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessages: PropTypes.string.isRequired,
};

export default SignupPage;
