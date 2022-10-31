import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Import Actions
import { signOut } from '../../AuthActions';

const SignOutPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(signOut)
    }, [dispatch]);

    return (
      <Redirect to='/' />
    );
};

export default SignOutPage;
