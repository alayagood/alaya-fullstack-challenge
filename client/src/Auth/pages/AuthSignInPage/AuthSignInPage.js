import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// Import Components
import AuthLoginWidget from '../../components/AuthSignInWidget';
// Import Actions
import { signInRequest } from '../../AuthActions';

const AuthSignInPage = () => {

  const dispatch = useDispatch();
  const { session, error } = useSelector(state => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (session) {
      history.push('/posts');
    }
  }, [session, history])

  const handleLogin = (user) => {
    dispatch(signInRequest(user));
  };

  return (
    <div className='container mt-5'>
      <AuthLoginWidget login={handleLogin} error={error} />
    </div>
  );
};


export default AuthSignInPage;
