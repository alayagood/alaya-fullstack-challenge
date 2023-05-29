import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import {signInRequest} from "../UserAction";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const UserSignIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isAuthenticated = useAuth();
    const error = useSelector((state) => state.user?.errors);

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (error) {
            console.log('Error:', error); // Handle the error as needed (e.g., display an error message)
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInRequest({email, password}));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <Typography variant="h4">Sign In</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    required
                                    error={error !== null}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    required
                                    error={error !== null}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button  variant="contained" color="primary" disabled={!email || !password} type="submit" variant="contained" fullWidth>
                                    Sign In
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Don't have an account?{' '}
                                    <Link href="/sign-up">Sign Up</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserSignIn;
