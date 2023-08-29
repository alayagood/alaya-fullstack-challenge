import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import { Button } from '@mui/material';
import { logUser } from '../../store/actions/Users/userActions';
import Alert from '@mui/material/Alert';
import storageService from '../../services/storage/storageService';
import { formValidation } from '../../utils/formValidation';
import { IUserState } from '../../interfaces/UserState';


const LoginPage: React.FC = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState<string>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  //form validation
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [emailErrorText, setEmailErrorText] = useState<string | undefined>('');
  const [passwordErrorText, setPasswordErrorText] = useState<string | undefined>('');


  //state
  const userInfo = useSelector((state: IUserState) => state.user);

  useEffect(() => {
    if('message' in userInfo) {
      setLoginError(userInfo.message as string);
    }
    if(storageService.get('session', 'isAuthenticated')) {
      history.push('/user-posts')
  }

  }, [userInfo, history]);

  const validateEmail = (): boolean => {
    const isValidEmail = formValidation.isValidEmail(email);
    const isEmpty = formValidation.isValidEmail(email);

    if(isEmpty.failed) {
        setEmailError(true);
        setEmailErrorText(isEmpty.message);
      return false
    }  else if( isValidEmail.failed) {
        setEmailError(true);
        setEmailErrorText(isValidEmail?.message);
      return false
    } else {
        setEmailError(false);
      return true
    }
  }

  const validatePassword = (): boolean => {
    const isEmpty = formValidation.isEmpty(password);
    if(isEmpty.failed) {
        setPasswordError(true);
        setPasswordErrorText(isEmpty.message);
      return false
    } else {
        setPasswordError(false);
      return true
    }
  }

  const handleLogin = () => {

    if( validateEmail() && validatePassword() ) {
      dispatch(logUser({email, password}));
    }

  }

  return (
    <div className="container w-75 login">
       <div className="row mt-5 login__form d-flex flex-column justify-content-center">
       <h2>Login</h2>
          <div className="col mt-3 mb-4">
              <FormControl fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input 
                  id="email" 
                  type='email' 
                  aria-describedby="email-text" 
                  error={emailError}
                  value={email} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  onBlur={validateEmail} 
                  onFocus={validateEmail} 
                  onInput={validateEmail} 
                  required 
                />
                <FormHelperText id="email-text">{emailError ? emailErrorText : 'Email adress account.'}</FormHelperText>
              </FormControl>
          </div>
          <div className="col">
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input 
                  id="password" 
                  type='password' 
                  aria-describedby="password-text"
                  error={passwordError} 
                  value={password} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                  onBlur={validatePassword} 
                  onFocus={validatePassword}
                  onInput={validatePassword} 
                  required 
                />
                <FormHelperText id="password-text">{passwordError ? passwordErrorText : 'Your password'}.</FormHelperText>
              </FormControl>
          </div>
          <div className="col d-flex justify-content-center">
            <Button onClick={handleLogin} variant="contained" color='primary' {...(emailError || passwordError ? {disabled: true} : {})}>
              Login
            </Button>
          </div>
       </div>
       <div className="mt-5">
        {
          loginError && <Alert severity="error">{loginError}</Alert>
        }
        
       </div>
    </div>
  );
}

export default LoginPage;