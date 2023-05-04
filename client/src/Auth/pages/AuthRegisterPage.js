import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, CircularProgress } from '@material-ui/core/'
// Import Components
import PageTitle from '../../common/components/PageTitle';
// Import Actions
import { registerRequest } from '../AuthActions';
// Import Style
const useStyles = makeStyles(theme => ({
    main: {
        maxWidth: 400,
        margin: 'auto'
    },
    formContainer: {
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

const AuthLoginPage = () => {

  const dispatch = useDispatch();
  const { loading, token, error } = useSelector(state => state.auth);
  const classes = useStyles();
  const [state, setState] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [token, history])

  const submit = () => {
    if (state.username && state.password) {
        dispatch(registerRequest(state.username.value, state.password.value));
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    let error = false;
    switch(evt.target.name){
      case 'username':
        if(!/^[a-zA-Z0-9]{5,30}$/.test(value)){
          error = true;
        }
        break;
      
      case 'password':
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,128}$/.test(value)){
          error = true;
        }
        break;
      
      case 'confirmPassword':
        if(value.length > 0 && value !== state.password?.value){
          error = true;
        }
        break;
      
      default:
        break;
    }
    setState({
        ...state,
        [evt.target.name]: {value: value, error: error}
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    }
  };

  const validForm = () => {
    return state.username?.value && !state.username?.error && 
           state.password?.value && !state.password?.error && 
           state.confirmPassword?.value && !state.confirmPassword?.error;
  }

  return (
    <div className='container mt-5'>
      <PageTitle title={'Register'}/>
      <div className={`${classes.main}`}>
          <div className='row'>
              <div className={`d-flex flex-column w-100 align-items-center`}>
                  <form className={`${classes.formContainer}`}>
                    <TextField className='w-100' variant="filled" label="Username" name="username" error={state.username?.error} onChange={handleChange} 
                    helperText={state.username?.error ? "The username must be an alphanumeric string with a minimum length of 5 and a maximum length of 30" : ""} />
                    <TextField className='w-100' variant="filled" label="Password" name="password" error={state.password?.error} type="password" onChange={handleChange}
                    helperText={state.password?.error ? "The password must have at least 6 characters, contain at least one uppercase letter, at least one lowercase letter, and at least one digit" : ""} />
                    <TextField className='w-100' variant="filled" label="Confirm Password" name="confirmPassword" error={state.confirmPassword?.error} type="password" onChange={handleChange} 
                    onKeyPress={handleKeyPress} helperText={state.confirmPassword?.error ? "Passwords don't match" : ""} />
                    <span className='text-danger'>{error}</span>
                    { loading ? <CircularProgress />
                      :
                      <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!validForm() || loading}>
                        Create account
                      </Button>
                    }
                  </form>
              </div>
          </div>
      </div>
    </div>
  );
};


export default AuthLoginPage;