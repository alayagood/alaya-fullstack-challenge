import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { signupUserRequest } from '../AuthActions';
import { validateForm } from '../ValidationUtils';
import { Card, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';
import FormErrors from '../../Form/components/FormErrors';
import LabeledInput from '../../Form/components/LabeledInput';


const SignupForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector((state) => {
    if(state.auth.user){
      return state.auth.user
    }
    return null;
  }); 

  
  const [formData, setFormData] = useState({
    email:  '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const isFormValid = () => {
    const errors = validateForm(
      formData.email,
      formData.password,
      formData.confirmPassword
    );
    setErrorMessages(errors);
    return errors.length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }
    
    try {
      await dispatch(signupUserRequest(formData));
    } catch (error) {
      console.log(error);
      setFormData({
        password: '',
        confirmPassword: '',
      });
    }


  };

  const handleInputChange = (e) => {
    e.persist();
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  
  if (isAuthenticated) {
    return <Navigate to="/new-post" />;
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="top"     
    >
      <Grid item xs={3} style={{ maxWidth: '300px' }}>
      <Card variant="outlined">   
        <CardContent>             
          <Typography color="textSecondary" gutterBottom variant="h5" component="h2">
              Join Us!
          </Typography>
          <FormErrors error={error} errorMessages={errorMessages} />
          <form onSubmit={handleSignup}>
            <Grid item xs={12} className="mb-3">
              <LabeledInput
                label="Email"
                id="email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} className="mb-3">
              <LabeledInput
                label="Password"
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} className="mb-3">
              <LabeledInput
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </Grid>
            <Button style={{ width: '100%' }} variant="contained" type="submit">Sign Up</Button>
          </form>

        </CardContent>       
        
        <CardActions>

          <Typography variant="body2" color="textSecondary">
            Already have an account? <Link to="/login">Log in here</Link>
          </Typography>

        </CardActions>
      </Card>
  </Grid>
</Grid>

  );
};

export default SignupForm;