import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoadingSelector } from "../../redux/user";
import MUILink from "@material-ui/core/Link";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Modal({ title, method, onSubmit }) {
  const classes = useStyles();
  const isLoading = useSelector(isLoadingSelector);

  const isLogin = method === "login";
  const url = isLogin ? "/signup" : "/login";
  const text =
    (isLogin ? "Don't haven an account?" : "Already registered?") + " ";
  const textUrl = isLogin ? "Register now" : "Login instead";

  return (
    <div className={`${classes.root} d-flex flex-column my-4`}>
      <h1 className="mx-auto">{title}</h1>
      <form
        div
        className={`${classes.root} d-flex flex-column my-4 mx-auto`}
        onSubmit={isLoading ? () => {} : onSubmit}
      >
        {method === "signup" && (
          <TextField variant="filled" label="Your name" name="name" />
        )}
        <TextField variant="filled" label="Username" name="username" />

        <TextField
          variant="filled"
          label="Password"
          type="password"
          name="password"
        />

        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
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
