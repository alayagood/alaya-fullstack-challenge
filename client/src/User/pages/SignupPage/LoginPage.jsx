import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUserRequest } from '../../UserActions';
import Cookie from "js-cookie";
import AuthForm from '../../components/AuthForm';

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errors = useSelector((state) => state.user.errors);
  const isLoggedIn = !!Cookie.get('jwt');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      loginUserRequest({
        email,
        password,
      }),
    );
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <AuthForm
      submitButtonText="Login"
      email={email}
      password={password}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      errorMessages={errors}
    />
  );
}

export default LoginPage;
