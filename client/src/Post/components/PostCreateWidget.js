import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {imageUploader} from "../../util/imageUploader";
import {useSelector} from "react-redux";
import {getUserId} from "../../Auth/AuthReducer";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const PostCreateWidget = ({ addPost }) => {

    const [state, setState] = useState({});
    const [error, setError] = useState(undefined);
    const [image, setImage] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const userId = useSelector(getUserId, undefined);
    const isValid = state.name && state.title && state.content && userId

    const defaultError = 'Something went wrong'

    const submit = async () => {
        if (!isValid) {
            setError(defaultError);
            return;
        }
        if (image) {
            setLoading(true);
            const imgUploaderResp = await imageUploader(image)
            if (!imgUploaderResp) {
                setError(defaultError);
                setLoading(false)
                return;
            }
            addPost({...state, image: imgUploaderResp});
            setLoading(false)
            return;
        }
        addPost(state);
    };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
        ...state,
        [evt.target.name]: value
    });
  };

    const handleFileChange = (evt) => {
        setImage(evt.target.files[0])
    }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
        <h3>Create new post</h3>
        <TextField variant="filled" label="Author name" name="name" onChange={handleChange} />
        <TextField variant="filled" label="Post title" name="title" onChange={handleChange} />
        <TextField variant="filled" multiline rows="4" label="Post content" name="content" onChange={handleChange} />
        <TextField type="file" name="image" onChange={handleFileChange} />
        <Button
            className="mt-4"
            variant="contained"
            color="primary"
            onClick={() => submit()}
            disabled={!isValid || loading}
        >
            {loading? 'Loading...' : 'Submit'}
        </Button>
        {error && <p>{error}</p>}
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
