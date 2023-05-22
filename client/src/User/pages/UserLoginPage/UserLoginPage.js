import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "../../../hooks/useForm";
import { authenticateUser } from "../../UserActions";
import { selectUser } from "../../UserSelectors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const UserLoginPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(selectUser);

  const requiredFields = ["username", "password"];

  const {
    onSubmit,
    hasError,
    isLoading,
    errorMessage,
    isFormDisabled,
    handleInputChange,
  } = useForm({
    handleSubmit: async (formData) => {
      await dispatch(authenticateUser(formData));
    },
    requiredFields,
  });

  return (
    <form
      disabled={isFormDisabled}
      onSubmit={onSubmit}
      className={`${classes.root} d-flex flex-column my-4 mx-auto`}
    >
      <h3>Login</h3>
      <TextField
        autoFocus
        variant="filled"
        label="Username"
        name="username"
        required
        onChange={handleInputChange}
      />
      <TextField
        type="password"
        variant="filled"
        label="Password"
        name="password"
        required
        onChange={handleInputChange}
      />
      <div className={`loader-button mt-4 ${isLoading ? "on" : ""}`}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isFormDisabled || isLoading}
        >
          Login
        </Button>
      </div>
      {hasError && <div className="mt-4 text-danger">{errorMessage}</div>}
      {!!user.error && <div className="mt-4 text-danger">{user.error}</div>}
      <div className="mt-4">
        No account yet? <Link to="/signup">Sign up</Link>
      </div>
    </form>
  );
};

export default UserLoginPage;
