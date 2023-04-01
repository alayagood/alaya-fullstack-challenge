import React from 'react';
import TextField from '@material-ui/core/TextField';

const CustomTextField = ({ label, value, onChange, error, helperText, type = 'text' }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

export default CustomTextField;
