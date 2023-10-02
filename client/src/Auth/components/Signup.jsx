import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { signupRequest } from '../AuthActions';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const selectRedirectTo = (state) => state.nav.redirectTo;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function getDefaultState() {
  return {
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
  };
}

function Signup(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState(getDefaultState());
  const classes = useStyles();
  const redirectTo = useSelector(selectRedirectTo);

  const signupAction = (email, name, password) => {
    dispatch(signupRequest(email, name, password));
  };

  const submit = () => {
    if (
      !props.cookies?.auth &&
      state.name &&
      state.email &&
      state.password &&
      state.password === state.passwordConfirmation
    ) {
      signupAction(state.email, state.name, state.password);
      setState(getDefaultState());
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  if (redirectTo && redirectTo !== '/signup') {
    return <Redirect to={redirectTo} />;
  }
  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create your account</h3>
      <TextField
        label="email"
        name="email"
        onChange={handleChange}
        value={state.email}
      />
      <TextField
        label="name"
        name="name"
        onChange={handleChange}
        value={state.name}
      />
      <TextField
        type="password"
        label="password"
        name="password"
        onChange={handleChange}
        value={state.password}
      />
      <TextField
        type="password"
        label="confirm password"
        name="passwordConfirmation"
        onChange={handleChange}
        value={state.passwordConfirmation}
      />
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit()}
        disabled={
          !state.name ||
          !state.email ||
          !state.password ||
          state.password !== state.passwordConfirmation
        }
      >
        Submit
      </Button>
    </div>
  );
}

export default Signup;
