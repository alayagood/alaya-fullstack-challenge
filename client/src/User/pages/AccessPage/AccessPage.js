import React, { useState, useEffect } from 'react';

import { Avatar, Button, TextField, Link, Grid, Typography, makeStyles, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, signUpRequest } from '../../UserActions';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpPage() {
  const classes = useStyles();
  const [hasAccount, setHasAccount] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const userState = useSelector(state => state.user);

  const [userData, setUserData] = useState({
    email: undefined,
    password: undefined,
    confirmPassword: undefined
  });


  useEffect(() => {
    if (userState.isAuthenticated) {
      history.push('/');
    }
  }, [userState]);


  const handleSignup = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      return alert("Passwords don't match")
    }
    dispatch(signUpRequest({ ...userData }))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginRequest(userData))
    return
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    setUserData({
      ...userData,
      [name]: value
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />

        <Typography component="h1" variant="h5">
          {hasAccount ? "Login" : "Sign up"}
        </Typography>
        <form className={classes.form}
          onSubmit={e => {
            if (!hasAccount) {
              handleSignup(e)
            } else {
              handleLogin(e)
            }
          }} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                onChange={handleChange}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {
              !hasAccount && <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  error={userData.password !== userData.confirmPassword}
                  onChange={handleChange}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                />
              </Grid>}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {hasAccount ? "Sign In" : "Sign Up"}
          </Button>

        </form>
        <Link
          component="button"
          onClick={() => { setHasAccount(!hasAccount) }}
        >
          {hasAccount ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </Link>

      </div>

    </Container>
  );
}