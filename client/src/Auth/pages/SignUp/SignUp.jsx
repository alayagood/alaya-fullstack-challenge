import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import Logo from '../../../logo.svg';

const useStyles = makeStyles(theme => ({
  root: {
      '& > *': {
          margin: theme.spacing(1),
      },
  },
}));

function SignUpPage() {
  // const dispatch = useDispatch();
  const [state, setState] = useState({});
  const classes = useStyles();

  const handleChange = (evt) => {
    const {value} = evt.target;
    setState({
        ...state,
        [evt.target.name]: value
    });
  };

  const submit = () => {
    if (state.name && state.username && state.password) {
      // dispatch(addPostRequest(post));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
          <h1 className="mt-4">
             Alaya Blog
          </h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className={`${classes.root} d-flex flex-column my-4 w-100 col-6`}>
        <TextField variant="filled" label="Name" name="name" onChange={handleChange} />
          <TextField variant="filled" label="Username" name="username" onChange={handleChange} />
          <TextField variant="filled" label="Password" name="password" onChange={handleChange} />
          <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.name || !state.username || !state.password}>
              Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

SignUpPage.propTypes = {};


export default SignUpPage;
