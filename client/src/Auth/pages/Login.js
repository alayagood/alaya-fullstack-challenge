import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Logo from '../../logo.svg';
import { loginRequest, signupRequest } from '../AuthActions';
import LoginWidget from '../components/LoginWidget';
import RegistetrWidget from '../components/RegistetrWidget';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (user) => {
    dispatch(loginRequest(user)).then(() => history.push('/'));
  };

  const handleSignup = (user) => {
    dispatch(signupRequest(user));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px' }} />
          <h1 className="mt-4">Alaya Blog</h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-6">
          <LoginWidget login={handleLogin} />
        </div>
        <div className="col-6">
          <RegistetrWidget signup={handleSignup} />
        </div>
      </div>
    </div>
  );
}
