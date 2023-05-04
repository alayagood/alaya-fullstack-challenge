import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Link, Button, CircularProgress } from '@material-ui/core/'
// Import Components
import PageTitle from '../../common/components/PageTitle';
// Import Actions
import { loginRequest } from '../AuthActions';
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
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({});

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [token])

  const submit = () => {
    if (state.username && state.password) {
        dispatch(loginRequest(state.username, state.password));
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
        ...state,
        [evt.target.name]: value
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    }
  };


  return (
    <div className='container mt-5'>
      <PageTitle title={'Log In'}/>
      <div className={`${classes.main}`}>
        <div className='row'>
            <div className={`d-flex flex-column w-100 ${classes.formContainer} align-items-center`}>
                <TextField className='w-100' variant="filled" label="Username" name="username" onChange={handleChange} />
                <TextField className='w-100' variant="filled" label="Password" name="password" type="password" onChange={handleChange} onKeyPress={handleKeyPress} />
                <span className='text-danger'>{error}</span>
                { loading ? <CircularProgress />
                  :
                  <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.username || !state.password || loading}>
                    Sign In
                  </Button>
                }
                <span>Don't have an account? <Link href="/register" className="text-primary">Create an account</Link> </span>
            </div>
        </div>
      </div>
    </div>
  );
};


export default AuthLoginPage;