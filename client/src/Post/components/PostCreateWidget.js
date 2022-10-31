import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
// Import Style

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const PostCreateWidget = ({ addPost }) => {
    const [state, setState] = useState({
        title: '',
        content: '',
    });
    const classes = useStyles();

    const validate = () => state.title && state.content;

    const submit = (evt) => {
        if (!validate()) {
            return;
        }

        addPost(state);
        setState({
            title: '',
            content: ''
        });
        evt.preventDefault();
    };

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    return (
        <form onSubmit={submit} >
          <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
            <h3>Create new post</h3>
            <TextField variant="filled" label="Post title" name="title" value={state.title} onChange={handleChange} />
            <TextField variant="filled" multiline rows="4" label="Post content" name="content" value={state.content} onChange={handleChange} />
            <Button type="submit" className="mt-4" variant="contained" color="primary" disabled={!validate()}>
              Submit
            </Button>
          </div>
        </form>
    );
};

PostCreateWidget.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
