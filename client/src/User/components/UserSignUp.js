import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import {signUpRequest, setError} from "../UserAction";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const error = useSelector((state) => state.user?.error);

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUpRequest({fullName, email, password}));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <Typography variant="h4">Sign Up</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    label="Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    required
                                    error={error !== null && error?.email}
                                    helperText={error?.email}
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
                                    error={error !== null && error?.password}
                                    helperText={error?.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button className="mt-4" variant="contained" color="primary" disabled={!fullName || !email || !password} type="submit" fullWidth>
                                    Sign Up
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Already have an account?{' '}
                                    <Link href="/sign-in">Sign In</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
