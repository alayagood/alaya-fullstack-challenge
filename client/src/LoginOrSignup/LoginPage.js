import React from "react";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../redux/user/userActions";
import { Modal } from "./components";

function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchLogin({
        username: e.target.username.value,
        password: e.target.password.value,
      })
    );
  };

  return <Modal title="Login" method="login" onSubmit={handleSubmit} />;
}

export default LoginPage;
