import React from "react";
import { useDispatch } from "react-redux";
import { fetchSignup } from "../redux/user/userActions";
import { Modal } from "./components";

function SignupPage() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchSignup({
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value,
      })
    );
  };

  return <Modal title="Signup" method="signup" onSubmit={handleSubmit} />;
}

export default SignupPage;
