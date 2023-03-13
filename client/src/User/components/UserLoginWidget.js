import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import validator from 'validator';

const useStyles = makeStyles(theme => ({
  root: {
      '& > *': {
          margin: theme.spacing(1),
      },
  },
}));

const isLoginValid = (user) => user &&
  user.password &&
  user.email &&	
  validator.isEmail(user.email);

const UserLoginWidget = ({ login }) => {
  const [state, setState] = useState({});
  const classes = useStyles();

  const submit = () => {
    if (isLoginValid(state)) {
      login(state);
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;

    setState({
        ...state,
        [evt.target.name]: value
    });
  };

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <TextField variant="filled" label="Email" name="email" onChange={handleChange} />
      <TextField variant="filled" label="Password" name="password" onChange={handleChange} />
      <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!isLoginValid(state)}>
          Login
      </Button>
    </div>
  );
};

UserLoginWidget.propTypes = {
  login: PropTypes.func.isRequired
};

export default UserLoginWidget;
