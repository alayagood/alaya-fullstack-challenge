import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
// Import Actions
import { userLogin, userRegister } from '../../AuthActions';

export const AuthPage = () => {
  return (
    <div className="auth">
        <Login />
    </div>
  );
};

const Login = () => {

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = {"usersname":"", password:""};
  const [status, setStatus] = useState("");

  const succesfullLogin = async (res) =>{
    localStorage.setItem('token', res.token);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    user.usersname = username;
    user.password = password;
    dispatch(userLogin(user)).then(res => {
      
      if(res){
        setStatus(res.message);
        if(res.success){
          succesfullLogin(res);
        }
      }
      console.log(res);
    });

  };

  const handleRegister = async (event) => {
    user.usersname = username;
    user.password = password;
    dispatch(userRegister(user)).then(res => {
      if(res){
        if(!res.success){
          setStatus(res.errors.email + " " + res.message);
        }
        else{
          setStatus(res.message);
        }
      }
      console.log(res);
    });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login/Register</h2>
        <div className="form-group">
          <label htmlFor="usersname">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id="submit" type="submit">Login</button> 
        <button id="register" type="button" onClick={handleRegister}>Register</button>
        <div><h8>{status}</h8></div>
      </form>
    </div>
  );
};

  export default AuthPage;