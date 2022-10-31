import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Header, hookStateToField, nonEmpty, TextInput } from './common';
import { signUp } from '../AuthActions';

const SignUpWidget = ({ classes }) => {
    const [state, setState] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const handleChange = hookStateToField(state, setState);

    const validate = () => {
        return nonEmpty(state.name)
            && nonEmpty(state.email)
            && nonEmpty(state.password)
            && state.password === state.password2;
    }

    const submit = (evt) => {
        if (!validate()) {
            return;
        }

        dispatch(signUp(state))
            .then(() => history.push('/'))
            .catch(err => console.error("couldn't sign up!", err));

        evt.preventDefault();
    };

    return (
        <>
          <Header classes={classes}>Sign up</Header>
          <form className={classes.form} onSubmit={submit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextInput
                  name="name"
                  id="name"
                  label="Name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  name="email"
                  id="email"
                  label="Email address"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  name="password"
                  id="password"
                  label="Password"
                  type="password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  name="password2"
                  id="password2"
                  label="Repeat your password"
                  type="password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!validate()}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </>
    );
};

export default SignUpWidget;
