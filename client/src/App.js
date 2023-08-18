import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './Nav/components/Navbar';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import AuthPage from './Auth/components/SighUpPage';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1ecde2',
		},
	},
});

function App(props) {
	return (
		<ThemeProvider theme={theme}>
			<div className="w-100">
				<Provider store={props.store}>

					<Navbar/>
					<div className="w-100 pt-5 mt-5">
						<BrowserRouter>
							<Routes>
								<Route path="/" element={<PostListPage showAddPost={true}/>}/>
								<Route path="/posts/:cuid/:slug" element={<PostDetailPage/>}/>
								<Route path="/sign-in" element={<AuthPage/>}/>
								<Route path="/sign-up" element={<AuthPage/>}/>
							</Routes>
						</BrowserRouter>
					</div>
				</Provider>
			</div>
		</ThemeProvider>
	);
}

App.propTypes = {
	store: PropTypes.object.isRequired,
};

export default App;
