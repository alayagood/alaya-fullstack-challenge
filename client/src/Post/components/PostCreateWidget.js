import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
// Import Style

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

  const loginState = useSelector(state => state.login);

  const submit = () => {
    if (loginState.jwt && loginState.username && state.title && state.content) {
      addPost({ name: loginState.username, ...state }, loginState.jwt);
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const content = loginState.jwt ?
    <div>
      <h3>Create new post</h3>
      <TextField id="postTitle" variant="filled" label="Post title" name="title" onChange={handleChange} />
      <TextField id="postContent" variant="filled" multiline rows="4" label="Post content" name="content" onChange={handleChange} />
      <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.title || !state.content}>
        Submit
      </Button>
    </div>
    : 'You need to login to create posts';

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      {content}
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
