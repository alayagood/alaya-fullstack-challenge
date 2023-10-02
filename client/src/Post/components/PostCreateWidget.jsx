import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
// Import Style

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const getDefaultState = () => ({ title: '', content: '' });

const PostCreateWidget = ({ addPost, cookies }) => {
  const [state, setState] = useState(getDefaultState());
  const classes = useStyles();

  const submit = () => {
    if (cookies?.auth?.identity?.name && state.title && state.content) {
      addPost({ name: cookies.auth.identity.name, ...state });
      setState(getDefaultState());
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
      <TextField
        label="Post title"
        name="title"
        onChange={handleChange}
        value={state.title}
      />
      <TextField
        multiline
        rows="4"
        label="Post content"
        name="content"
        onChange={handleChange}
        value={state.content}
      />
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit()}
        disabled={!state.title || !state.content}
      >
        Submit
      </Button>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default PostCreateWidget;
