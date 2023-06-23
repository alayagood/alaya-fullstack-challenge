import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import Actions
import { signupRequest } from '../SignupActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

export function SignupPage() {

  const [state, setState] = useState({});
  const dispatch = useDispatch();
  const signupState = useSelector(state => state.signup);

  const signup = () => {
    if (state.username && state.password) {
      dispatch(signupRequest(state));
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  const successfulSignup = signupState.success ?
    <Card className="w-100 my-4">
      <CardContent>User created!</CardContent>
    </Card>
    : '';

  return (
    <div className="col-6 offset-3">
      <div className="d-flex flex-column my-4 w-100">
        <h3>Signup</h3>
        <TextField id="username" variant="filled" label="Username" name="username" onChange={handleChange} />
        <TextField id="password" variant="filled" label="Password" name="password" type="password" onChange={handleChange} />
        <Button className="mt-4" variant="contained" color="primary" onClick={() => signup()} disabled={!state.username || !state.password}>
          Sign up
        </Button>
        {successfulSignup}
      </div>
    </div>
  );
}
export default SignupPage;
