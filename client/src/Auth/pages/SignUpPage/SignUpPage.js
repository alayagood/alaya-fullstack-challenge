import React from 'react';
import { useDispatch } from 'react-redux';
import Logo from '../../../logo.svg';
import SignUpWidget from '../../../Auth/components/SignUpWidget';
import { signUpRequest } from '../../AuthActions';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export function SignUpPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignUp = (post) => {
    dispatch(signUpRequest(post)).then((res) => {
      if (res.message) {
        if (confirm(res.message)) { // eslint-disable-line
          return;
        }
      }
      
      if (res.success) {
        if (confirm('User created. Proceed to login.')) { // eslint-disable-line
          history.replace('/login')
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
            Sign Up
          </h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <SignUpWidget signUp={handleSignUp} />
      </div>
      <center> Already have a user? <Link to="/login" >Click here to login</Link></center>
    </div>
  );
}
export default SignUpPage;
