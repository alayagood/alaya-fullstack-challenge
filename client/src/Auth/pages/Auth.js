import React from 'react';

import Logo from '../../logo.svg';
import { CreateUserForm } from "../components/CreateUserForm/CreateUserForm";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { useAuth } from "./useAuth";

export const AuthPage = () => {
    const {signUpSuccess, errors, handleSignUp, handleLogin} = useAuth();

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex align-items-center">
                    <img className="mx-3" src={Logo} alt="Logo" style={{height: '72px'}}/>
                    <h1 className="mt-4">
                        Alaya Blog </h1>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-4">
                    <LoginForm onSubmit={handleLogin} error={errors.login}/>
                </div>
                <div className="col-8">
                    <CreateUserForm onSubmit={handleSignUp} error={errors.signup} success={signUpSuccess}/>
                </div>
            </div>
        </div>
    );
};
