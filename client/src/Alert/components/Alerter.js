import React from 'react';
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import { useSelector, useDispatch } from 'react-redux';
import { alertCleared } from '../AlertAction';

const selectError = state => state.alert.err;

function Alerter() {
  const err = useSelector(selectError);
  const dispatch = useDispatch();

    return err ? (
      <div className="alerter">
      <Alert severity="error" onClose={() => { dispatch(alertCleared()) }}>
        <AlertTitle>An error has occured</AlertTitle>
        {err.message}
      </Alert>
      </div>
    ) : '';

}

export default Alerter
