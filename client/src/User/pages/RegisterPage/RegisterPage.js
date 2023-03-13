import React from 'react';
import { useDispatch } from 'react-redux';
import Logo from '../../../logo.svg';
import UserCreateWidget from '../../components/UserCreateWidget';
import { createUserRequest } from '../../UserActions';

export function RegisterPage() {
  const dispatch = useDispatch();

  const createUser = (user) => {
    dispatch(createUserRequest(user));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
          <h1 className="mt-4">
             Register
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <UserCreateWidget createUser={createUser} />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;