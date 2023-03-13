import React from 'react';
import { useDispatch } from 'react-redux';
import UserCreateWidget from '../../components/UserCreateWidget';
import UserLoginWidget from '../../components/UserLoginWidget';
import { loginRequest, createUserRequest } from '../../UserActions';
import Title from '../../../common/components/Title';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export function RegisterPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const createUser = (user) => {
    dispatch(async d => {
      await createUserRequest(user)(d);
      history.push('/');
    })
  };

  const login = async (login) => {
    dispatch(async d => {
      await loginRequest(login)(d);
      history.push('/');
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <Title text="Login" />
          <UserLoginWidget login={login} />
        </div>
        <div className="col-1 align-self-center">
          <Typography variant="h6" align="center">OR</Typography>
        </div>
        <div className="col-5">
          <Title text="Register" />
          <UserCreateWidget createUser={createUser} />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;