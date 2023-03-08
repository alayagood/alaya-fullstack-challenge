import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { signUp } from '../../AuthActions';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

function SignUpPage() {
	const dispatch = useDispatch();
	const [state, setState] = useState({});
	const classes = useStyles();

	const handleChange = (evt) => {
		const { value } = evt.target;
		setState({
			...state,
			[evt.target.name]: value,
		});
	};

	const submit = () => {
		if (state.email && state.password) {
			dispatch(signUp(state));
		}
	};

	return (
		<div className="container">
			<div className="row">
				<div className={`${classes.root} d-flex flex-column my-4 w-100 col-6`}>
					<TextField
						variant="filled"
						label="Email"
						name="email"
						onChange={handleChange}
					/>
					<TextField
						variant="filled"
						label="Password"
						name="password"
						onChange={handleChange}
					/>
					<Button
						className="mt-4"
						variant="contained"
						color="primary"
						onClick={() => submit()}
						disabled={!state.email || !state.password}
					>
						Sign Up
					</Button>
				</div>
			</div>
		</div>
	);
}

SignUpPage.propTypes = {};

export default SignUpPage;
