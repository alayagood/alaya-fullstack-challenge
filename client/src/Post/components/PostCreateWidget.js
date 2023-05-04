import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, TextField, Button } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
// Import Style
const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const PostCreateWidget = ({ addPost, loading }) => {

    const [state, setState] = useState({});
    const classes = useStyles();



  const submit = () => {
    if (state.name && state.title && state.content) {
      addPost(state);
      resetState();
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
        ...state,
        [evt.target.name]: value
    });
  };

  const resetState = () => {
    setState({});
  }

  return (
    <div className={`${classes.root} d-flex flex-column w-100`}>
        <h3 className='mt-4'>Create new post</h3>
        <TextField variant="filled" label="Author name" name="name" onChange={handleChange} value={state.name || ''} />
        <TextField variant="filled" label="Post title" name="title" onChange={handleChange} value={state.title || ''} />
        <TextField variant="filled" multiline rows="4" label="Post content" name="content" onChange={handleChange} value={state.content || ''} />
        { loading ? <CircularProgress />
          :
          <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.name || !state.title || !state.content || loading}>
            Submit
          </Button>
        }
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
