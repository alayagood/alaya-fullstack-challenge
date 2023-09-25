import React, { useReducer } from 'react'


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import { CLEAR_ERROR } from '../../ErrorReducer';
import { useDispatch, useSelector } from 'react-redux';

export default function AlertComponent() {
  const dispatch = useDispatch();
  const { error, message } = useSelector(state => state.error);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: CLEAR_ERROR })
  };

  return <>
    <Snackbar style={{ width: "90%" }} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={!!error} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose} severity={"error"} sx={{ width: '100%' }}>
        {message || ""}
      </MuiAlert>
    </Snackbar>

  </>
}