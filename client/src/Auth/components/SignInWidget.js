import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Header, hookStateToField, nonEmpty, TextInput } from './common';
import { signIn } from '../AuthActions';

const SignInWidget = ({ classes }) => {
    const [state, setState] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const handleChange = hookStateToField(state, setState);

    const validate = () => {
        return nonEmpty(state.email)
            && nonEmpty(state.password);
    }

    const submit = (evt) => {
        if (!validate()) {
            return;
        }

        dispatch(signIn(state))
            .then(() => history.push('/'))
            // TODO: signal error to the user
            .catch(err => console.error("can't log in!", err));

        evt.preventDefault();
    };

    return (
        <>
          <Header classes={classes}>Sign in</Header>
          <form className={classes.form} onSubmit={submit}>
            <Grid container spacing={2}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!validate()}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item xs>
                <a href="#" variant="body2">
                  Forgot your password?
                </a>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </>
    );
};

export default SignInWidget;
