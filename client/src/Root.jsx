import React, { useEffect, useMemo } from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import SignInPage from './Auth/pages/SignIn/SignIn';
import SignUpPage from './Auth/pages/SignUp/SignUp';
import AuthProvider from './Auth/components/AuthProvider';

// TODO: Add Logger to the project to avoid having linter warnings
function Root() {
	const token = useSelector((state) => state.auth.token);
	const isAuthenticated = useMemo(() => !!token, [token]);

	return (
		<AuthProvider>
			<div className="w-100">
				<Navbar />
				<div className="w-100 pt-5 mt-5">
					<BrowserRouter>
						<Switch>
							<Route path="/signup" exact component={SignUpPage} />

							{isAuthenticated ? (
								<Route path="/" exact component={PostListPage} />
							) : (
								<Route path="/" exact component={SignInPage} />
							)}

							{isAuthenticated && (
								<Route
									path="/posts/:cuid/:slug"
									exact
									component={PostDetailPage}
								/>
							)}
						</Switch>
					</BrowserRouter>
				</div>
			</div>
		</AuthProvider>
	);
}

Root.propTypes = {};

export default Root;
