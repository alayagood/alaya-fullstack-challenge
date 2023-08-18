import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField } from '@mui/material';

const PostCreateWidget = ({ addPost }) => {
	const [state, setState] = useState({});

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
		<Box sx={{'& > *': { margin: 'spacing(1)'} }}
             className='d-flex flex-column my-4 w-100'>
			<h3>Create new post</h3>
			<TextField variant="filled" label="Post title" name="title" onChange={handleChange}/>
			<TextField variant="filled" multiline minRows="4" label="Post content" name="content"
					   onChange={handleChange}/>
			<Button className="mt-4" variant="contained" color="primary" onClick={() => submit()}
					disabled={!state.title || !state.content}>
				Submit
			</Button>
		</Box>
	);
};

PostCreateWidget.propTypes = {
	addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
