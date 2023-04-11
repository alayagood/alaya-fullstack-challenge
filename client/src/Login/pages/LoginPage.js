import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {addUserRequest, loginUserRequest}  from '../LoginActions';

import LoginSignInWidget from '../components/LoginSignInWidget';
import LoginSignUpWidget from '../components/LoginSignUpWidget';
import Logo from '../../logo.svg';


const LoginPage = () => {

    const [isRegistrated, setRegistrated]  = useState(false);
    const [alreadyExist, setAlreadyExist] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const dispatch = useDispatch();

    const handleSignUp = async (newUser) => {
      const result = await dispatch(addUserRequest(newUser));
      if(result.user) {
        setRegistrated(true);
        setAlreadyExist(false);
      }
      else {
        setRegistrated(false);
        setAlreadyExist(true);
      }
    };

    const handleSignIn = async (user) => {
      const result = await dispatch(loginUserRequest(user));

      if(result.token) {
        window.location =  "/home";
      }
      else (setErrorLogin(true))
    }  


    return (
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex align-items-center">
            <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
            <h1 className="mt-4">
               Alaya Login
            </h1>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            <LoginSignInWidget signIn={handleSignIn} errorLogin={errorLogin}/>
          </div>
          <div className="col-6">
            <LoginSignUpWidget signUp={handleSignUp} registrated={isRegistrated} alreadyExist={alreadyExist}/>
          </div>
        </div>
      </div>
    );
  };


  export default LoginPage;
  
