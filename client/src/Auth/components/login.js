import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LOGIN_RESET, login, register } from '../../actions/authActions';
import CustomTextField from '../../shared/components/customTextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector((state) => state.auth?.isLoading);
  const error = useSelector((state) => state.auth?.error);
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.nativeEvent.submitter.name === 'Register') {
      dispatch(register(username, password));
    }
    else {
      dispatch(login(username, password));
    }
  };

  if (isLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    window.setTimeout(() => { dispatch({ type: LOGIN_RESET }); }, 5000);
    return (
      <div className={classes.root}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error.response?.data?.message || error.message}
        </Alert>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <form onSubmit={handleSubmit}>
            <CustomTextField
              label="Username"
              value={username}
              onChange={handleUsernameChange}
              error={!!error}
              helperText={error ? error.message : ''}
            />
            <CustomTextField
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              error={!!error}
              helperText={error ? error.message : ''}
              type="password"
            />
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              Log In
            </Button>

            <Button name="Register" type="submit" variant="contained" color="primary" disabled={isLoading}>
              Register
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
