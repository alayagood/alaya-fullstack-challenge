import { Typography } from '@mui/material';
import { Alert, AlertTitle } from '@mui/lab';
import './LabeledInput.css';

const FormErrors = ({ error, errorMessages }) => {

  return (
    <>
        {error && <Alert severity="error">{error.message}</Alert>}
        {errorMessages.length > 0  && (           
          <Alert icon={false} severity="error">    
            <AlertTitle>Error</AlertTitle>          
            {errorMessages.map((errorMsg, index) => (
              <Typography component="div" key={index} color="error" style={{ fontSize: '10px' }}>- {errorMsg}</Typography>
            ))}       
          </Alert>      
        )}
    </>
  );
};

export default FormErrors;