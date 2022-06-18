import React from "react";
import Alert from "@material-ui/lab/Alert";
import MUISnackbar from "@material-ui/core/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar, snackbarSelector } from "../redux/ui";

export default function Snackbar() {
  const dispatch = useDispatch();
  const { open, variant, message } = useSelector(snackbarSelector);

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <MUISnackbar
      severity={variant}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      aria-describedby="client-snackbar"
    >
      <Alert severity={variant || "info"}>{message}</Alert>
    </MUISnackbar>
  );
}
