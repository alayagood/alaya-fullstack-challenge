import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { addUserRequest, logout } from '../../UserActions';

function SignupPage() {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.id);
  const errors = useSelector((state) => state.user.errors);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    dispatch(logout());
    setIsInit(false);
    Cookie.remove('jwt');
  }, [dispatch]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addUserRequest({
        email,
        password,
      }),
    );
  };

  if (!!userID && !isInit) {
    return <Redirect to="/" />;
  }

  return (
    <AuthForm
      submitButtonText="Sign up"
      email={email}
      password={password}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      errorMessages={errors}
    />
  );
}

export default SignupPage;
