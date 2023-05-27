import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { addPostRequest } from '../../redux/actions/postActions';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const PostCreateWidget = ({ showAddPost }) => {
    const [state, setState] = useState({});
    const classes = useStyles();
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();

    const submit = async () => {
        if (state.name && state.title && state.content) {
            const postObject = {
                ...state,
                image: image,
            };
            try {
                dispatch(addPostRequest(postObject));
                setState({
                    name: '',
                    title: '',
                    content: '',
                });
                setImage(null);
                NotificationManager.success('Post enviado com sucesso!');
            } catch (error) {
                console.error('Failed to add post:', error);
                NotificationManager.error('Falha ao enviar o post.');
            }
        }
    };

    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value,
        });
    };

    const handleImageChange = e => {
        setImage(e.target.files[0]);
    };

    return (
        <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
            <h3>Criar novo post</h3>
            <TextField
                variant="filled"
                label="Nome do autor"
                name="name"
                onChange={handleChange}
                value={state.name || ''}
            />
            <TextField
                variant="filled"
                label="Título do post"
                name="title"
                onChange={handleChange}
                value={state.title || ''}
            />
            <TextField
                variant="filled"
                multiline
                label="Conteúdo do post"
                name="content"
                onChange={handleChange}
                value={state.content || ''}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <Button
                className="mt-4"
                variant="contained"
                color="primary"
                onClick={submit}
                disabled={!state.name || !state.title || !state.content}
            >
                Enviar
            </Button>
        </div>
    );
};

PostCreateWidget.propTypes = {
    showAddPost: PropTypes.bool,
};

export default PostCreateWidget;
