import React, { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { useLocalStorage } from "../../hooks/useLocalStorage";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const history = useHistory();

  const login = async (data) => {
    setToken(data);
    history.push("/posts");
  };

  const logout = () => {
    setToken(null);
    history.push("/login", { replace: true });
  };

  const isLoggedIn = (token) => {
    // TODO: check token validity
    return !!token;
  };

  const value = useMemo(
    () => ({
      isLoggedIn: isLoggedIn(token),
      login,
      logout,
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
