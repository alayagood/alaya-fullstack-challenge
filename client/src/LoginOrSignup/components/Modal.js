import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MUILink from "@material-ui/core/Link";

function Modal({ title, method, onSubmit }) {
  const isLogin = method === "login";
  const url = isLogin ? "/signup" : "/login";
  const text =
    (isLogin ? "Don't haven an account?" : "Already registered?") + " ";
  const textUrl = isLogin ? "Register now" : "Login instead";

  return (
    <div className="container">
      <div className="row">
        <h1>{title}</h1>
      </div>
      <form className="row" onSubmit={onSubmit}>
        <div className="col">
          {method === "signup" && (
            <div className="row justify-content-center">
              <input
                className="form-control"
                name="name"
                placeholder="Your name"
              />
            </div>
          )}
          <div className="row justify-content-center">
            <input
              className="form-control"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="row justify-content-center">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="row justify-content-center">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
      <div className="row justify-content-center">
        <p>
          {text}
          <Link to={url}>
            <MUILink component="span">{textUrl}</MUILink>
          </Link>
        </p>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  method: PropTypes.oneOf(["login", "signup"]).isRequired,
};

export default Modal;
