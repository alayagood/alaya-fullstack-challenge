import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
// Import Style
const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const LoginSignUpWidget = ({ signUp, registrated,alreadyExist }) => {

  const [state, setState] = useState({});
  const classes = useStyles();

  const submit = () => {
    if (state.userName && state.password) {
      signUp(state);
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
        <h3>Not a user yet? What are you waiting for!</h3>
        <TextField variant="filled" label="User" name="userName" onChange={handleChange} />
        <TextField variant="filled" label="Password" name="password"  type="password" onChange={handleChange} />
        {registrated && (<p>Your registration is done, sign in on your left.</p>)}
        {alreadyExist && (<p>The user already exists. Sign in on your left.</p>)}
        <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.userName || !state.password}>
            Enroll
        </Button>
    </div>
  );
};

LoginSignUpWidget.propTypes = {
  signUp: PropTypes.func.isRequired
};

export default LoginSignUpWidget;
