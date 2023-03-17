import React from 'react';
import { useDispatch } from 'react-redux';
import Logo from '../../../logo.svg';
import LoginWidget from '../../../Auth/components/LoginWidget';
import { loginRequest } from '../../AuthActions';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
  
export function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = (post) => {
    dispatch(loginRequest(post)).then((res) => {
      if (res.token) {
        if (confirm('Successfully logged in')) { // eslint-disable-line
          history.replace('/')
        }
      };
      
      if (res.message) {
        if (confirm(res.message)) { // eslint-disable-line
          return;
        }
      }
    });
  };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
          <h1 className="mt-4">
            Login 
          </h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <LoginWidget login={handleLogin} />
      </div>
      <center> New to Alaya Blog? <Link to="/signup" >Sign up now</Link></center>
    </div>
  );
}
export default LoginPage;
