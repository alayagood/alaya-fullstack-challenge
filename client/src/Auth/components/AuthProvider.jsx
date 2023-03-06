import React, { createContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthenticatedUser } from "../AuthActions";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
      const dispatchAuthentication = async() => {
        await dispatch(getAuthenticatedUser())
      }

      dispatchAuthentication();
    }, [])

    const value = useMemo(() => ({
      isAuthenticated: !!token
    }), [token])
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  }

  AuthProvider.propTypes = {};

  export default AuthProvider;