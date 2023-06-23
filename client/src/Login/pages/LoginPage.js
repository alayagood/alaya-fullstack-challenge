import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import Actions
import { loginRequest } from '../LoginActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { useHistory } from "react-router-dom";

export function LoginPage() {

  const [state, setState] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const loginState = useSelector(state => state.login);

  const login = () => {
    if (state.username && state.password) {
      dispatch(loginRequest(state, history));
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  const errorCard = loginState.error ?
    <Card className="w-100 my-4">
      <CardContent>Invalid credentials</CardContent>
    </Card>
    : '';

  return (
    <div className="col-6 offset-3">
      <div className="d-flex flex-column my-4 w-100">
        <h3>Login</h3>
        <TextField id="username" variant="filled" label="Username" name="username" onChange={handleChange} />
        <TextField id="password" variant="filled" label="Password" name="password" type="password" onChange={handleChange} />
        <Button className="mt-4" variant="contained" color="primary" onClick={() => login()} disabled={!state.username || !state.password}>
          Login
        </Button>
        {errorCard}
      </div>
    </div>
  );
}
export default LoginPage;
