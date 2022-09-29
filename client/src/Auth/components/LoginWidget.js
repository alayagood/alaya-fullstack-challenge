import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function LoginWidget({ login }) {
  const [state, setState] = useState({});
  const classes = useStyles();

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const submit = () => {
    login(state);
  };

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Login</h3>
      <TextField variant="filled" label="Email" name="email" onChange={handleChange} />
      <TextField variant="filled" type={'password'} label="Password" name="password" onChange={handleChange} />

      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={submit}
        disabled={!state.email || !state.password}
      >
        Login user
      </Button>
    </div>
  );
}
