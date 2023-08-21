import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const PostCreateWidget = ({ addPost }) => {
    const [state, setState] = useState({});
    const classes = useStyles();
    const userInformation = useSelector(state => state.auth.user); // Get user information

    const submit = () => {
        if (state.title && state.content) {
            addPost(state);
        }
    };

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    return (
        <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
            {userInformation ? (
                <>
                    <h3>Create new post</h3>
                    <TextField variant="filled" label="Post title" name="title" onChange={handleChange} />
                    <TextField variant="filled" multiline rows="4" label="Post content" name="content" onChange={handleChange} />
                    <Button className="mt-4" variant="contained" color="primary" onClick={submit} disabled={!state.title || !state.content}>
                        Submit
                    </Button>
                </>
            ) : (
                <div>
                    <p>You need to be logged in to create a post.</p>
                    <Button component={Link} to="/login" variant="contained" color="primary">
                        Login
                    </Button>
                    <Button component={Link} to="/signup" variant="contained" color="primary" className="ml-2">
                        Sign Up
                    </Button>
                </div>
            )}
        </div>
    );
};

PostCreateWidget.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
