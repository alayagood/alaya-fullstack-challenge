import { FormControl, InputLabel, Input, FormHelperText, Button, Alert } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNewUser } from '../../store/actions/Users/userActions';
import { IUser } from '../../interfaces/User';
import { formValidation } from '../../utils/formValidation';

const RegisterPage: React.FC =(): JSX.Element => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [isUserCreated, setIsUserCreated] = useState<boolean>(false);

  const dispatch = useDispatch();

    //form validation
    const [nameError, setNameError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordRepeatedError, setPasswordRepeatedError] = useState<boolean>(false);
  
    const [nameErrorText, setNameErrorText] = useState<string | undefined>('');
    const [emailErrorText, setEmailErrorText] = useState<string | undefined>('');
    const [passwordErrorText, setPasswordErrorText] = useState<string | undefined>('');
    const [passwordRepeatedErrorText, setPasswordRepeatedErrorText] = useState<string | undefined>('');

    const validateInput = (): boolean => {
      const isEmpty = formValidation.isEmpty(name);
      if( isEmpty.failed ) {
        setNameError(true);
        setNameErrorText(isEmpty.message);
        return false
      } else {
        setNameError(false);
        return true
      }
    };

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
  };

  const validatePassword = (): boolean => {
    const isValidPass = formValidation.isValidPassword(password);
    const isEmpty = formValidation.isEmpty(password);
    
    if(isEmpty.failed) {
        setPasswordError(true);
        setPasswordErrorText(isEmpty.message);
      return false
    } else if (isValidPass.failed) {
        setPasswordError(true);
        setPasswordErrorText(isValidPass.message);
      return false
    } else {
        setPasswordError(false);
        return true
    }
  };

  const validateRepeatedPassword = () => {
    const isPasswordMatch = formValidation.isPasswordMatch(password, repeatedPassword);

    if (isPasswordMatch.failed) {
      setPasswordRepeatedError(true);
      setPasswordRepeatedErrorText(isPasswordMatch.message);
      return false
    } else {
      setPasswordRepeatedError(false);
    }
  }

  const handleUserCreation = async () => {
    const user: IUser = {
        name,
        email,
        password
    }
    if( validateInput() && validateEmail() && validatePassword() ) {
      dispatch(createNewUser(user));
      setIsUserCreated(true);
    }
    
  }

  return (
    <div className="container w-75 post">
       <div className="row mt-5 post__form d-flex flex-column justify-content-center">
       <h2>Create an account</h2>
          <div className="col mt-3 mb-4">
              <FormControl fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input 
                  id="name" 
                  type='name' 
                  aria-describedby="name-text"
                  error={nameError}
                  value={name} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  onBlur={validateInput} 
                  onFocus={validateInput} 
                  onInput={validateInput} 
                  required 
                />
                <FormHelperText id="name-text">{nameError ? nameErrorText : 'Your name'}.</FormHelperText>
              </FormControl>
          </div>
          <div className="col">
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
          <div className="col mt-3">
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
          <div className="col mt-3">
            <FormControl fullWidth>
                <InputLabel htmlFor="password">Repeat password</InputLabel>
                  <Input 
                    id="password" 
                    type='password' 
                    aria-describedby="password-text"
                    error={passwordRepeatedError}
                    value={repeatedPassword} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRepeatedPassword(e.target.value)}
                    onBlur={validateRepeatedPassword} 
                    onFocus={validateRepeatedPassword} 
                    onInput={validateRepeatedPassword} 
                    required 
                  />
                <FormHelperText id="password-text">{passwordRepeatedError ? passwordRepeatedErrorText : 'Repeat your password.'}</FormHelperText>
            </FormControl>
          </div>
          <div className="col d-flex justify-content-center">
            <Button onClick={handleUserCreation} variant="contained" color='primary'>
              Create
            </Button>
          </div>
       </div>
       <div className="mt-5">
        {
          isUserCreated && <Alert severity="success">User registered successfully, click here to <Link to="/login">login</Link></Alert>
        }
        
       </div>
    </div>
  );
}

export default RegisterPage;