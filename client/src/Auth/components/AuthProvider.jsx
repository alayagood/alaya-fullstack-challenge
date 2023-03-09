import React, { createContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthenticatedUser } from '../AuthActions';

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		const dispatchAuthentication = async () => {
			if (user) {
				await dispatch(getAuthenticatedUser());
			}
		};

		dispatchAuthentication();
	}, []);

	const value = useMemo(
		() => ({
			isAuthenticated: !!user,
		}),
		[user]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {};

export default AuthProvider;
