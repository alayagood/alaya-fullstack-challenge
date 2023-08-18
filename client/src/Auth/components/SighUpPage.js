import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import { paperStyles, formStyles, textFieldStyleProps, textFieldStyles } from './SighUpPage.styles';

// Import Actions
import { sighUpRequest, sighInRequest } from '../AuthActions';

const pages = {
	signIn: '/sign-in',
	signUp: '/sign-up',
	home: '/',
}

const AuthPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const [state, setState] = useState({});

	const isLogin = location.pathname === pages.signIn;
	const authUser = useSelector(state => state.auth.user);

	if(authUser){
		return <Navigate to={pages.home} replace={true} />;
	}

	const handleSwitchPage = () => {
		const targetPage = isLogin ? pages.signUp : pages.signIn;
		navigate(targetPage);
	};

	const handleSubmit = (e) => {
		const authFn = isLogin ? sighInRequest : sighUpRequest;

		dispatch(authFn({
			name: state.name, email: state.email, password: state.password,
		}));

		e.preventDefault();
	};

	const handleChange = (evt) => {
		const value = evt.target.value;

		setState({
			...state,
			[evt.target.name]: value
		});
	};

	return (
		<Container maxWidth="xs">
			<Paper elevation={3} sx={paperStyles}>
				<Typography variant="h5" gutterBottom>
					{isLogin ? 'Log In' : 'Register'}
					{state.email}
					{state.password}
				</Typography>
				<form onSubmit={handleSubmit} style={formStyles}>
					{ !isLogin &&
						<TextField
							label="Name"
							type="name"
							name="name"
							onChange={handleChange}
							sx={textFieldStyles}
							{...textFieldStyleProps}
						/>
                    }
					<TextField
						label="Email"
						type="email"
						name="email"
						onChange={handleChange}
						sx={textFieldStyles}
						{...textFieldStyleProps}
					/>
					<TextField
						label="Password"
						type="password"
						name="password"
						onChange={handleChange}
						sx={textFieldStyles}
						{...textFieldStyleProps}
					/>
					<Button type="submit" variant="contained" color="primary" fullWidth
							disabled={!state.email || !state.password}>
						{isLogin ? 'Log In' : 'Register'}
					</Button>
					<Button color="primary" onClick={handleSwitchPage} fullWidth>
						{isLogin ? 'Switch to Register' : 'Switch to Log In'}
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default AuthPage;
