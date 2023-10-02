import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { redirect } from '../../Nav/NavActions';

function Signin({ toggle, signinAction }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignin(e) {
    e.preventDefault();
    signinAction(email, password);
    toggle();
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Signin</h2>
        <form onSubmit={handleSignin}>
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Signin</button>
        </form>
        <button onClick={toggle}>Close</button>
      </div>
    </div>
  );
}

function Signout({ toggle, signoutAction }) {
  function handleSignout(e) {
    e.preventDefault();
    signoutAction();
    toggle();
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <button onClick={handleSignout}>Signout</button>
        <button onClick={toggle}>Close</button>
      </div>
    </div>
  );
}

function Auth({ redirectToSignupAction, signinAction, cookies, removeCookie }) {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const dispatch = useDispatch();

  function togglePopup() {
    setIsDisplayed(!isDisplayed);
  }

  function signoutAction() {
    removeCookie('auth', { path: '/' });
    dispatch(redirect('/'));
  }

  const signIn = (
    <div>
      <Button color="inherit" onClick={togglePopup}>
        Signin
      </Button>
      {isDisplayed ? (
        <Signin toggle={togglePopup} signinAction={signinAction} />
      ) : null}
      {!isDisplayed ? (
        <Button color="inherit" onClick={redirectToSignupAction}>
          Signup
        </Button>
      ) : null}
    </div>
  );

  const signOut = (
    <div>
      <Button color="inherit" onClick={togglePopup}>
        {cookies.auth?.identity?.name}
      </Button>
      {isDisplayed ? (
        <Signout toggle={togglePopup} signoutAction={signoutAction} />
      ) : null}
    </div>
  );

  return cookies.auth ? signOut : signIn;
}

export default Auth;
