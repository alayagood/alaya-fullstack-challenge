import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
      '& > *': {
          margin: theme.spacing(1),
      },
  },
}));

const isUserValid = (user) => user &&
  user.firstName &&
  user.lastName &&
  user.accountName &&
  user.password &&
  user.email;

const UserCreateWidget = ({ createUser }) => {
  const [state, setState] = useState({});
  const classes = useStyles();

  const submit = () => {
    if (isUserValid(state)) {
      createUser(state);
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
      <TextField variant="filled" label="First name" name="firstName" onChange={handleChange} />
      <TextField variant="filled" label="Last name" name="lastName" onChange={handleChange} />
      <TextField variant="filled" label="Username" name="accountName" onChange={handleChange} />
      <TextField variant="filled" label="Email" name="email" onChange={handleChange} />
      <TextField variant="filled" label="Password" name="password" onChange={handleChange} />
      <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!isUserValid(state)}>
          Submit
      </Button>
    </div>
  );
};

UserCreateWidget.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default UserCreateWidget;
